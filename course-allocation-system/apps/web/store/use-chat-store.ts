"use client";
import { create } from "zustand";
import { api } from "@/lib/api";

interface ChatEntry {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  provider?: string;
}

interface ChatStore {
  messages: ChatEntry[];
  loading: boolean;
  provider: "groq" | "nvidia" | "openrouter";
  setProvider: (p: "groq" | "nvidia" | "openrouter") => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

export const 
useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,
  provider: "groq",
  setProvider: (provider) => set({ provider }),
  clearMessages: () => set({ messages: [] }),
  sendMessage: async (message: string) => {
    const userEntry: ChatEntry = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, userEntry], loading: true }));
    try {
      const result = await api.chat({ message, provider: get().provider });
      const aiEntry: ChatEntry = {
        id: result.sessionId,
        role: "ai",
        content: result.message,
        timestamp: result.timestamp,
        provider: result.provider,
      };
      set((s) => ({ messages: [...s.messages, aiEntry], loading: false }));
    } catch (e) {
      const errEntry: ChatEntry = {
        id: crypto.randomUUID(),
        role: "ai",
        content: `❌ Error: ${(e as Error).message}`,
        timestamp: new Date().toISOString(),
      };
      set((s) => ({ messages: [...s.messages, errEntry], loading: false }));
    }
  },
}));
