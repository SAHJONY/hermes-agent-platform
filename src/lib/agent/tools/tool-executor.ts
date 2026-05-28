// Tool Executor - manages and executes agent tools
// Inspired by hermes-agent's tool_executor.py
import { Tool, ToolCall, ToolResult, AgentContext, ToolCategory } from '../types';

// Built-in tool handlers
import { webSearchTool } from './builtin/web-search';
import { codeExecutionTool } from './builtin/code-execution';
import { fileToolsTool } from './builtin/file-tools';
import { browserTool } from './builtin/browser';

export class ToolExecutor {
  private tools: Map<string, Tool> = new Map();
  private enabledTools: Set<string> = new Set();

  constructor() {
    this.registerBuiltInTools();
  }

  /**
   * Register built-in tools (similar to hermes-agent's core tools)
   */
  private registerBuiltInTools() {
    this.registerTool(webSearchTool);
    this.registerTool(codeExecutionTool);
    this.registerTool(fileToolsTool);
    this.registerTool(browserTool);
  }

  /**
   * Register a new tool
   */
  registerTool(tool: Tool) {
    this.tools.set(tool.name, tool);
    this.enabledTools.add(tool.name);
    console.log(`[ToolExecutor] Registered tool: ${tool.name}`);
  }

  /**
   * Enable/disable a tool
   */
  setToolEnabled(toolName: string, enabled: boolean) {
    if (enabled) {
      this.enabledTools.add(toolName);
    } else {
      this.enabledTools.delete(toolName);
    }
  }

  /**
   * Get all available tools
   */
  getTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get enabled tools
   */
  getEnabledTools(): Tool[] {
    return Array.from(this.tools.values()).filter(t => this.enabledTools.has(t.name));
  }

  /**
   * Execute a tool call
   */
  async executeToolCall(toolCall: ToolCall, context: AgentContext): Promise<ToolResult> {
    const tool = this.tools.get(toolCall.name);

    if (!tool) {
      return {
        tool_call_id: toolCall.id,
        result: '',
        success: false,
        error: `Tool '${toolCall.name}' not found`,
      };
    }

    if (!this.enabledTools.has(toolCall.name)) {
      return {
        tool_call_id: toolCall.id,
        result: '',
        success: false,
        error: `Tool '${toolCall.name}' is disabled`,
      };
    }

    try {
      console.log(`[ToolExecutor] Executing tool: ${toolCall.name}`);
      const result = await tool.handler(toolCall.arguments, context);
      return result;
    } catch (error) {
      console.error(`[ToolExecutor] Tool error: ${toolCall.name}`, error);
      return {
        tool_call_id: toolCall.id,
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Execute multiple tool calls in parallel
   */
  async executeToolCalls(toolCalls: ToolCall[], context: AgentContext): Promise<ToolResult[]> {
    const promises = toolCalls.map(tc => this.executeToolCall(tc, context));
    return Promise.all(promises);
  }

  /**
   * Get tools by category
   */
  getToolsByCategory(category: ToolCategory): Tool[] {
    return this.getTools().filter(t => t.category === category);
  }

  /**
   * Check if a tool exists
   */
  hasTool(toolName: string): boolean {
    return this.tools.has(toolName);
  }
}

export const toolExecutor = new ToolExecutor();