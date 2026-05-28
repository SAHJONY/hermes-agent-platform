// Code Execution Tool - Real implementation using Piston API
import { Tool, AgentContext } from '../../types';

/**
 * Code execution tool using Piston API
 * Piston is a free, open-source code execution engine
 * Public instance: https://emkc.org/api/v2/piston
 * 
 * Supports: python, javascript, typescript, go, rust, java, c++, and more
 */

// Language to Piston runtime mapping
const RUNTIME_MAP: Record<string, { language: string; version: string }> = {
  python: { language: 'python', version: '3.10.0' },
  python3: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  js: { language: 'javascript', version: '18.15.0' },
  typescript: { language: 'typescript', version: '5.0.3' },
  ts: { language: 'typescript', version: '5.0.3' },
  go: { language: 'go', version: '1.16.2' },
  rust: { language: 'rust', version: '1.68.2' },
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'c++', version: '10.2.0' },
  c: { language: 'c', version: '10.2.0' },
};

export const codeExecutionTool: Tool = {
  name: 'code_execution',
  description: 'Execute Python, JavaScript, TypeScript, Go, Rust, Java, or C++ code in a sandboxed environment. Returns stdout, stderr, and execution time. Useful for data analysis, calculations, testing code snippets, and automation.',
  
  parameters: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'The code to execute',
      },
      language: {
        type: 'string',
        description: 'Programming language (python, javascript, typescript, go, rust, java, cpp)',
        default: 'python',
      },
      timeout_ms: {
        type: 'number',
        description: 'Execution timeout in milliseconds (default: 10000, max: 30000)',
        default: 10000,
      },
    },
    required: ['code'],
  },
  execute: async (args: Record<string, unknown>, _context: AgentContext): Promise<{tool_call_id: string; result: string; success: boolean; error?: string}> => {
    const startTime = Date.now();
    
    try {
      const { code, language = 'python', timeout_ms = 10000 } = args as {
        code: string;
        language?: string;
        timeout_ms?: number;
      };

      const pistonUrl = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston';
      
      const runtime = RUNTIME_MAP[language.toLowerCase()] || RUNTIME_MAP['python'];

      const fileExt = getExtension(language);
      const response = await fetch(`${pistonUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [
            {
              name: `main.${fileExt}`,
              content: code,
            },
          ],
          stdin: '',
          args: [],
          run_timeout: Math.min(timeout_ms, 30000),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Piston API error (${response.status}): ${errorText}`);
      }

      const data = await response.json() as {
        stdout: string;
        stderr: string;
        code: number;
        signal: string | null;
        output: string;
      };

      const executionTime = Date.now() - startTime;

      return {
        tool_call_id: '',
        result: JSON.stringify({
          success: data.code === 0,
          stdout: data.stdout || '',
          stderr: data.stderr || '',
          output: data.output || '',
          signal: data.signal,
          execution_time_ms: executionTime,
          language: runtime.language,
          version: runtime.version,
        }),
        success: true,
      };

    } catch (error) {
      console.error('[CodeExecution] Error:', error);
      return {
        tool_call_id: '',
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

function getExtension(language: string): string {
  const extensions: Record<string, string> = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    go: 'go',
    rust: 'rs',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
  };
  return extensions[language.toLowerCase()] || 'txt';
}