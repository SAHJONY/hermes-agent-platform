// Anthropic Provider - AI completion using Anthropic
import { Message, ModelConfig } from '../types';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export const anthropicProvider = {
  name: 'anthropic',
  countTokens: async (text: string): Promise<number> => {
    // Approximate token count for Claude
    return Math.ceil(text.length / 4);
  },
  async complete(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    // Placeholder implementation
    return 'Anthropic response placeholder';
  },

  async createCompletion(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    const mappedMessages = this.formatMessages(messages);
    
    if (systemPrompt) {
      mappedMessages.unshift({
        role: 'user',
        content: systemPrompt
      });
    }

    return this.complete(mappedMessages as any, systemPrompt, onChunk);
  },

  async createStreamingCompletion(
    messages: Message[],
    systemPrompt: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    return this.createCompletion(messages, systemPrompt, onChunk);
  },

  formatMessages(messages: Message[]): any[] {
    return messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
  }
};
