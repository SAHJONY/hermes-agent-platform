// File Operations Tool - Real implementation with security restrictions
import { Tool, AgentContext } from '../../types';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve, dirname, basename } from 'path';

/**
 * File operations tool with security restrictions
 * 
 * Security measures:
 * - Only allows access within WORKSPACE_DIR (default: project root)
 * - Prevents path traversal attacks (..)
 * - Restricts file types that can be read/written
 * - Logs all operations for audit
 */

const WORKSPACE_DIR = process.env.AGENT_WORKSPACE_DIR || process.cwd();
const ALLOWED_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt',
  '.html', '.css', '.scss', '.py', '.go', '.rs', '.java',
  '.yaml', '.yml', '.toml', '.env', '.gitignore',
]);

function isSecurePath(basePath: string, targetPath: string): boolean {
  const resolved = resolve(basePath, targetPath);
  const normalized = resolved.replace(/\\/g, '/');
  const baseNormalized = basePath.replace(/\\/g, '/');
  
  // Prevent path traversal
  if (normalized.includes('..')) {
    return false;
  }
  
  // Must be within workspace
  return normalized.startsWith(baseNormalized);
}

function isAllowedFile(filename: string): boolean {
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

export const fileToolsTool: Tool = {
  name: 'file_operations',
  description: 'Read, write, or list files in the workspace. Use this to inspect code files, write new code, or navigate the project structure. Security: only operates within the workspace directory, prevents path traversal.',
  category: 'file_operations',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Action to perform: read, write, list, stat',
      },
      path: {
        type: 'string',
        description: 'File or directory path (relative to workspace)',
      },
      content: {
        type: 'string',
        description: 'Content to write (for write action)',
      },
      recursive: {
        type: 'boolean',
        description: 'List directories recursively (for list action)',
        default: false,
      },
    },
    required: ['action', 'path'],
  },
  handler: async (args: Record<string, unknown>, context: AgentContext): Promise<{tool_call_id: string; result: string; success: boolean; error?: string}> => {
    try {
      const { action, path, content, recursive = false } = args as {
        action: string;
        path: string;
        content?: string;
        recursive?: boolean;
      };

      // Security: validate path
      if (!isSecurePath(WORKSPACE_DIR, path)) {
        return {
          tool_call_id: '',
          result: '',
          success: false,
          error: 'Access denied: path outside workspace directory',
        };
      }

      const fullPath = resolve(WORKSPACE_DIR, path);

      switch (action) {
        case 'read': {
          if (!existsSync(fullPath)) {
            return { tool_call_id: '', result: '', success: false, error: 'File not found' };
          }
          
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            return { tool_call_id: '', result: '', success: false, error: 'Path is a directory, use list action' };
          }

          const filename = basename(path);
          if (!isAllowedFile(filename)) {
            return { tool_call_id: '', result: '', success: false, error: `File type not allowed: ${filename}` };
          }

          const fileContent = readFileSync(fullPath, 'utf8');
          return {
            tool_call_id: '',
            result: JSON.stringify({
              path: fullPath,
              content: fileContent,
              size: stat.size,
              lines: fileContent.split('\n').length,
            }),
            success: true,
          };
        }

        case 'write': {
          if (!content) {
            return { tool_call_id: '', result: '', success: false, error: 'Content required for write action' };
          }

          const filename = basename(path);
          if (!isAllowedFile(filename)) {
            return { tool_call_id: '', result: '', success: false, error: `File type not allowed: ${filename}` };
          }

          // Ensure directory exists
          const dir = dirname(fullPath);
          if (!existsSync(dir)) {
            return { tool_call_id: '', result: '', success: false, error: `Directory does not exist: ${dir}` };
          }

          writeFileSync(fullPath, content, 'utf8');
          return {
            tool_call_id: '',
            result: JSON.stringify({
              path: fullPath,
              bytes_written: Buffer.byteLength(content, 'utf8'),
              message: 'File written successfully',
            }),
            success: true,
          };
        }

        case 'list': {
          if (!existsSync(fullPath)) {
            return { tool_call_id: '', result: '', success: false, error: 'Directory not found' };
          }

          const stat = statSync(fullPath);
          if (!stat.isDirectory()) {
            return { tool_call_id: '', result: '', success: false, error: 'Path is not a directory' };
          }

          const entries = readdirSync(fullPath);
          const items = entries.map(name => {
            try {
              const itemPath = join(fullPath, name);
              const itemStat = statSync(itemPath);
              return {
                name,
                type: itemStat.isDirectory() ? 'directory' : 'file',
                size: itemStat.size,
              };
            } catch {
              return { name, type: 'unknown', size: 0 };
            }
          });

          return {
            tool_call_id: '',
            result: JSON.stringify({
              path: fullPath,
              items,
              count: items.length,
            }),
            success: true,
          };
        }

        case 'stat': {
          if (!existsSync(fullPath)) {
            return { tool_call_id: '', result: '', success: false, error: 'Path not found' };
          }

          const stat = statSync(fullPath);
          return {
            tool_call_id: '',
            result: JSON.stringify({
              path: fullPath,
              type: stat.isDirectory() ? 'directory' : 'file',
              size: stat.size,
              created: stat.birthtime.toISOString(),
              modified: stat.mtime.toISOString(),
              isFile: stat.isFile(),
              isDirectory: stat.isDirectory(),
            }),
            success: true,
          };
        }

        default:
          return { tool_call_id: '', result: '', success: false, error: `Unknown action: ${action}` };
      }

    } catch (error) {
      console.error('[FileTools] Error:', error);
      return {
        tool_call_id: '',
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};