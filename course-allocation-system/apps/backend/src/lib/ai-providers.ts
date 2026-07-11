import OpenAI from "openai";
import Groq from "groq-sdk";
import { env } from "../config/env";

export type AIProvider = "groq" | "nvidia" | "openrouter";

export interface ProviderConfig {
  client: OpenAI | Groq;
  model: string;
  name: string;
}

/**
 * Provider configurations:
 *
 * 1. GROQ  — Ultra-fast inference, free tier available
 *    Models: llama-3.3-70b-versatile, mixtral-8x7b-32768, gemma2-9b-it
 *    Docs: https://console.groq.com/docs
 *
 * 2. NVIDIA NIM — OpenAI-compatible, powerful enterprise models
 *    Models: meta/llama-3.3-70b-instruct, nvidia/llama-3.1-nemotron-70b-instruct
 *    Docs: https://build.nvidia.com
 *
 * 3. OpenRouter — Aggregator with free model options
 *    Models: deepseek/deepseek-r1:free, google/gemma-3-27b-it:free, meta-llama/llama-3.3-70b-instruct:free
 *    Docs: https://openrouter.ai/models
 */
export function getProviderConfig(provider: AIProvider): ProviderConfig {
  switch (provider) {
    case "groq":
      return {
        client: new Groq({ apiKey: env.GROQ_API_KEY }),
        model: env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
        name: "Groq (LLaMA 3.3 70B)",
      };

    case "nvidia":
      return {
        client: new OpenAI({
          apiKey: env.NVIDIA_NIM_API_KEY,
          baseURL: "https://integrate.api.nvidia.com/v1",
        }),
        model: env.NVIDIA_MODEL ?? "meta/llama-3.3-70b-instruct",
        name: "NVIDIA NIM (LLaMA 3.3 70B Instruct)",
      };

    case "openrouter":
      return {
        client: new OpenAI({
          apiKey: env.OPENROUTER_API_KEY,
          baseURL: "https://openrouter.ai/api/v1",
          defaultHeaders: {
            "HTTP-Referer": "https://course-allocation-system.app",
            "X-Title": "Course Allocation System",
          },
        }),
        model: env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free",
        name: "OpenRouter (Free Model)",
      };
  }
}
