import OpenAI from "openai";
import Groq from "groq-sdk";
import { prisma } from "../lib/db";
import { AppError } from "../middlewares/error.middleware";
import { getProviderConfig, type AIProvider } from "../lib/ai-providers";
import { AllocationService } from "./allocation.service";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Queries the AI can natively answer using injected context
const SYSTEM_PROMPT = `You are an intelligent AI assistant for a University Course Allocation System.
Your primary role is to help university administrators understand and analyze course allocation data.

You have been given REAL-TIME allocation statistics from the database as context.
Always answer based on this data — do not make up or estimate numbers.

Capabilities:
- Explain how many students were allocated to each course
- Identify students who did not receive their first preference
- Calculate and explain course rejection rates
- Summarize category-wise (GENERAL/OBC/SC/ST) allocation breakdowns
- Identify trends and anomalies in the allocation data
- Answer general questions about the allocation system's business rules

Rules:
- Be concise, factual, and structured in your answers
- Use numbers from the provided context data
- Format tables or lists when presenting comparative data
- If the data is incomplete (e.g., allocation not yet run), tell the admin clearly
- Never refuse to answer if the data is available in the context
`;

function buildSystemContext(stats: Awaited<ReturnType<typeof AllocationService.getDashboardStats>>) {
  return `
=== REAL-TIME ALLOCATION DATA (as of ${new Date().toISOString()}) ===

STUDENT SUMMARY:
- Total Students: ${stats.students.total}
- Allocated: ${stats.students.allocated}
- Unallocated (no seats found): ${stats.students.unallocated}
- Pending (allocation not run yet): ${stats.students.total - stats.students.allocated - stats.students.unallocated}

COURSE STATISTICS:
${stats.courses.map((c) => `- ${c.name}: ${c.allocatedSeats}/${c.totalSeats} seats filled (${c.availableSeats} remaining)`).join("\n")}

CATEGORY-WISE ALLOCATION:
${
  stats.categoryAllocation.length > 0
    ? stats.categoryAllocation.map((c) => `- ${c.allocatedCategory}: ${c._count.id} students allocated`).join("\n")
    : "- No allocations processed yet"
}

COURSE REJECTION RATES:
${
  stats.rejectionRates.length > 0
    ? stats.rejectionRates
        .sort((a, b) => b.rejections - a.rejections)
        .map((r) => `- ${r.courseName}: ${r.rejections} rejections / ${r.totalPreferences} applications = ${r.rejectionRate} rejection rate`)
        .join("\n")
    : "- No rejection data yet (allocation not run)"
}

FIRST PREFERENCE MISS:
- ${stats.notFirstPreferenceCount} student(s) received a course other than their first preference.

=== END OF CONTEXT ===
`;
}

export const AIService = {
  async chat(message: string, provider: AIProvider, sessionId?: string) {
    const providerConfig = getProviderConfig(provider);

    // Validate that the API key for the chosen provider is configured
    const keyMap: Record<AIProvider, string | undefined> = {
      groq: process.env.GROQ_API_KEY,
      nvidia: process.env.NVIDIA_NIM_API_KEY,
      openrouter: process.env.OPENROUTER_API_KEY,
    };

    if (!keyMap[provider]) {
      throw new AppError(
        503,
        `Provider "${provider}" is not configured. Please add the API key to your .env file.`,
      );
    }

    // 1. Fetch live stats from DB to inject as context
    const stats = await AllocationService.getDashboardStats();
    const contextMessage = buildSystemContext(stats);

    // 2. Build message list (simple single-turn for now, extensible to multi-turn)
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT + "\n" + contextMessage },
      { role: "user", content: message },
    ];

    // 3. Call the AI provider
    let responseText = "";

    try {
      if (providerConfig.client instanceof Groq) {
        // Groq has its own SDK but identical interface
        const completion = await providerConfig.client.chat.completions.create({
          messages: messages as Parameters<typeof providerConfig.client.chat.completions.create>[0]["messages"],
          model: providerConfig.model,
          temperature: 0.3, // Lower temperature = more factual, less creative
          max_tokens: 1024,
        });
        responseText = completion.choices[0]?.message?.content ?? "No response from AI.";
      } else {
        // OpenAI-compatible (NVIDIA NIM and OpenRouter)
        const openaiClient = providerConfig.client as OpenAI;
        const completion = await openaiClient.chat.completions.create({
          messages,
          model: providerConfig.model,
          temperature: 0.3,
          max_tokens: 1024,
        });
        responseText = completion.choices[0]?.message?.content ?? "No response from AI.";
      }
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string };
      if (error.status === 401) {
        throw new AppError(401, `Invalid API key for provider "${provider}". Check your .env file.`);
      }
      if (error.status === 429) {
        throw new AppError(429, `Rate limit exceeded for provider "${provider}". Please try again later.`);
      }
      throw new AppError(502, `AI provider error: ${error.message ?? "Unknown error"}`);
    }

    // 4. Save the session to DB for history
    const session = await prisma.aISession.create({
      data: {
        query: message,
        response: responseText,
      },
    });

    return {
      sessionId: session.id,
      message: responseText,
      provider: providerConfig.name,
      model: providerConfig.model,
      timestamp: session.createdAt,
    };
  },

  async getHistory(limit = 20) {
    return prisma.aISession.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        query: true,
        response: true,
        createdAt: true,
      },
    });
  },

  async deleteSession(id: string) {
    const session = await prisma.aISession.findUnique({ where: { id } });
    if (!session) throw new AppError(404, `Session ${id} not found`);
    return prisma.aISession.delete({ where: { id } });
  },
};
