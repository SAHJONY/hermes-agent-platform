// AgentBrain - The main AI agent facade that ties together all components
import { 
  Message, 
  AgentContext, 
  AgentConfig, 
  ModelConfig,
  StreamingChunk
} from './types';
import { ConversationLoop } from './conversation-loop';
import { anthropicProvider } from './providers/anthropic-provider';
import { openaiProvider } from './providers/openai-provider';
import { AIProvider } from './types';

export class AgentBrain {
  private config: AgentConfig;
  private provider: AIProvider;
  private conversationLoop: ConversationLoop;

  constructor(config: AgentConfig) {
    this.config = config;
    this.provider = this.createProvider(config.model);
    this.conversationLoop = new ConversationLoop();
  }

  private createProvider(model: ModelConfig): AIProvider {
    switch (model.provider) {
      case 'anthropic':
        return anthropicProvider;
      case 'openai':
        return openaiProvider;
      default:
        return anthropicProvider;
    }
  }

  async process(
    messages: Message[],
    context: Omit<AgentContext, 'messages' | 'tools' | 'skills'>,
    onStream?: (chunk: StreamingChunk) => void
  ): Promise<string> {
    const fullContext: AgentContext = {
      ...context,
      messages,
      tools: this.config.tools || [],
      skills: this.config.skills || []
    };

    // Convert StreamingChunk to the simpler type used by ConversationLoop
    const streamCallback = onStream ? (c: { type: string; content?: string }) => {
      onStream({ type: c.type as StreamingChunk['type'], content: c.content ?? '' });
    } : undefined;

    return await this.conversationLoop.processMessage(messages, fullContext, this.provider, streamCallback);
  }

  async processStream(
    messages: Message[],
    context: Omit<AgentContext, 'messages' | 'tools' | 'skills'>,
    onChunk: (chunk: StreamingChunk) => void
  ): Promise<string> {
    const fullContext: AgentContext = {
      ...context,
      messages,
      tools: this.config.tools || [],
      skills: this.config.skills || []
    };
    
    const streamCallback = (c: { type: string; content?: string }) => {
      onChunk({ type: c.type as StreamingChunk['type'], content: c.content ?? '' });
    };

    return await this.conversationLoop.processMessage(messages, fullContext, this.provider, streamCallback);
  }

  async runSkill(skillId: string, input: string): Promise<string> {
    throw new Error(`Skill execution should go through ConversationLoop`);
  }

  getContext(): Partial<AgentContext> {
    return {};
  }
}

export type { AgentContext, Message, ModelConfig } from './types';
