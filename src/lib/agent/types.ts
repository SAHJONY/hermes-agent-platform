// Type definitions for the agent system
export interface Message {
  id: string;
  timestamp: number;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tool_calls?: ToolCall[];
  tool_result?: ToolResult;
  tool_call_id?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: string;
}

export interface ToolResult {
  tool_call_id: string;
  content: string;
  success: boolean;
}

export interface AgentContext {
  workspace_id?: string;
  user_id?: string;
  model?: ModelConfig;
  system_prompt?: string;
  messages: Message[];
  tools: Tool[];
  skills: Skill[];
}

export interface AgentConfig {
  name: string;
  model: ModelConfig;
  tools?: Tool[];
  skills?: Skill[];
  useUnifiedBrain?: boolean;
}

export interface ModelConfig {
  provider: 'anthropic' | 'openai';
  name?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface StreamingChunk {
  type: 'error' | 'text' | 'tool_call' | 'tool_result' | 'done';
  content?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  instructions: string;
  tools: string[];
  enabled: boolean;
}

export interface Tool {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export interface AIProvider {
  name: string;
  countTokens(text: string): Promise<number>;
  complete(messages: Message[], systemPrompt: string, onChunk?: (chunk: string) => void): Promise<string>;
  createCompletion(messages: Message[], systemPrompt: string, onChunk?: (chunk: string) => void): Promise<string>;
  createStreamingCompletion(messages: Message[], systemPrompt: string, onChunk?: (chunk: string) => void): Promise<string>;
}
