// OpenAI Provider - AI completion using OpenAI
import { Message, ModelConfig } from '../types';

export const openaiProvider = {
  name: 'openai',
  countTokens: async (text: string): Promise<number> => {
    // Approximate token count (1 token ≈ 4 chars for English)
    return Math.ceil(text.length / 4);
  },
  async complete(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    return 'OpenAI response placeholder';
  },

  async createCompletion(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    const mappedMessages = messages.map(m => {
      const base = { role: m.role, content: m.content };
      if (m.role === 'tool') {
        return { ...base, tool_call_id: (m as any).tool_call_id || 'tool-' + Date.now() };
      }
      return base;
    });

    if (systemPrompt) {
      mappedMessages.unshift({ role: 'system', content: systemPrompt });
    }

    return this.complete(mappedMessages as any, systemPrompt, onChunk);
  },

  async createStreamingCompletion(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    return this.createCompletion(messages, systemPrompt, onChunk);
  }
};
