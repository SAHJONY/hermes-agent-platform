export const MODELS = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
] as const

export const SKILLS = [
  {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search the web for current information',
    icon: 'Globe',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations',
    icon: 'Calculator',
  },
  {
    id: 'image_generation',
    name: 'Image Generation',
    description: 'Generate images from text descriptions',
    icon: 'Image',
  },
  {
    id: 'code_interpreter',
    name: 'Code Interpreter',
    description: 'Write and execute code',
    icon: 'Code',
  },
  {
    id: 'file_reader',
    name: 'File Reader',
    description: 'Read and analyze files',
    icon: 'FileText',
  },
] as const

export const MODEL_DISPLAY_NAMES: Record<string, string> = {
  'gpt-4': 'GPT-4',
  'gpt-4-turbo': 'GPT-4 Turbo',
  'gpt-3.5-turbo': 'GPT-3.5',
  'claude-3-opus': 'Claude 3 Opus',
  'claude-3-sonnet': 'Claude 3 Sonnet',
  'claude-3-haiku': 'Claude 3 Haiku',
  'gemini-pro': 'Gemini Pro',
}