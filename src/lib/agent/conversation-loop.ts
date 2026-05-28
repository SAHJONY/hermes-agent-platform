// ConversationLoop - The primary orchestrator for the agent's message flow
import { AgentContext, Message } from './types';
import { toolExecutor } from './tools';
import { isCodingTask, truncate, formatTimestamp } from './utils';
import { freebuffAgent } from './freebuff-agent';
import { hermesBridge } from './hermes-bridge';

// URL for Hermes agent (if available)
const HERMES_AGENT_URL = process.env.HERMES_AGENT_URL;

export class ConversationLoop {
  private maxTurns: number;
  private timeoutMs: number;
  private useHermes: boolean;
  private useFreebuff: boolean;

  constructor(maxTurns = 10, timeoutMs = 120000) {
    this.maxTurns = maxTurns;
    this.timeoutMs = timeoutMs;
    this.useHermes = !!HERMES_AGENT_URL;
    this.useFreebuff = true; // Always enable Freebuff for coding tasks
  }

  async processMessage(
    messages: Message[],
    context: AgentContext,
    provider: any,
    onStream?: (chunk: { type: string; content?: string }) => void
  ): Promise<string> {
    const userMessage = messages[messages.length - 1]?.content || '';

    // Route to Freebuff for coding tasks
    if (this.useFreebuff && isCodingTask(userMessage)) {
      if (onStream) {
        const result = await this.processWithFreebuff(messages, context);
        for (const chunk of result.split(' ')) {
          onStream({ type: 'text', content: chunk + ' ' });
        }
        onStream({ type: 'done', content: '' });
        return result;
      }
      return this.processWithFreebuff(messages, context);
    }

    // Use Hermes for complex reasoning if available
    if (this.useHermes) {
      return this.processWithHermes(messages, context, onStream);
    }

    // Fallback to local processing
    return this.processLocally(messages, context, provider, onStream);
  }

  private async processWithFreebuff(messages: Message[], context: AgentContext): Promise<string> {
    const result = await freebuffAgent.process(messages, context);
    return this.formatFreebuffResponse(result);
  }

  private async processWithHermes(
    messages: Message[],
    context: AgentContext,
    onStream?: (chunk: { type: string; content?: string }) => void
  ): Promise<string> {
    const currentMessages = [...messages];
    let turn = 0;

    while (turn < this.maxTurns) {
      turn++;
      const assistantMessage = await hermesBridge.invoke(
        currentMessages,
        context.workspace_id || "",
        this.timeoutMs
      );

      currentMessages.push(assistantMessage);

      // Check for tool calls
      const toolCalls = this.extractToolCalls(assistantMessage);
      if (toolCalls.length === 0) {
        if (onStream) {
          onStream({ type: 'text', content: assistantMessage.content || '' });
          onStream({ type: 'done', content: '' });
        }
        return assistantMessage.content || '';
      }

      // Execute tools
      const toolResults = await toolExecutor.executeToolCalls(toolCalls, context);
      for (const result of toolResults) {
        currentMessages.push({
          id: `tool-${Date.now()}`,
          timestamp: Date.now(),
          
          role: 'tool',
          content: JSON.stringify(result),
        });
      }

      // Check if all tools failed
      const allFailed = toolResults.every(r => !r.success);
      if (allFailed) {
        const finalResponse = 'All tool executions failed. The task could not be completed.';
        if (onStream) {
          onStream({ type: 'text', content: finalResponse });
          onStream({ type: 'done', content: '' });
        }
        return finalResponse;
      }
    }

    return 'Maximum turns reached without resolution.';
  }

  private async processLocally(
    messages: Message[],
    context: AgentContext,
    provider: any,
    onStream?: (chunk: { type: string; content?: string }) => void
  ): Promise<string> {
    if (!provider) {
      return 'No AI provider available. Please configure an AI provider.';
    }

    const systemPrompt = this.buildSystemPrompt(context);
    const response = await provider.complete(
      [...messages],
      systemPrompt,
      (chunk: string) => {
        if (onStream) {
          onStream({ type: 'text', content: chunk });
        }
      }
    );

    if (onStream) {
      onStream({ type: 'done', content: '' });
    }

    return response;
  }

  private formatFreebuffResponse(result: any): string {
    if (!result) return 'No response from Freebuff agent.';

    let response = '## Freebuff Analysis\n\n';

    if (result.proposed_files) {
      response += '### Proposed Changes:\n';
      for (const file of result.proposed_files) {
        response += `- \`${file.path}\`: ${file.description}\n`;
      }
      response += '\n';
    }

    if (result.logs) {
      response += '### Execution Logs:\n';
      for (const log of result.logs) {
        response += `- ${log}\n`;
      }
    }

    return response;
  }

  private buildSystemPrompt(context: AgentContext): string {
    const parts: string[] = [];

    if (context.system_prompt) {
      parts.push(context.system_prompt);
    }

    const modelProvider = context.model?.provider || 'anthropic';
    const modelName = modelProvider === 'anthropic' ? 'Claude' : 'an AI assistant';

    parts.push(`You are ${modelName} powered by the SAHJONY Agent Engine.`);
    parts.push('You have access to various tools to help accomplish tasks.');

    const enabledTools = toolExecutor.getEnabledTools();
    if (enabledTools.length > 0) {
      parts.push(`Available tools: ${enabledTools.join(', ')}.`);
    }

    return parts.join('\n');
  }

  private extractToolCalls(message: Message): any[] {
    if (!message.tool_calls) return [];

    // Handle different formats of tool calls
    if (typeof message.tool_calls === 'string') {
      try {
        const parsed = JSON.parse(message.tool_calls);
        return parsed.tool_calls || [];
      } catch {
        return [];
      }
    }

    return message.tool_calls;
  }
}

// Export singleton instance for convenience
export const conversationLoop = new ConversationLoop();

export function reset() {
  // Reset any state if needed
}
