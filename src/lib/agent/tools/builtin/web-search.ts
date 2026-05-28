// Web Search Tool - Real implementation using Google Custom Search API
import { Tool, AgentContext } from '../../types';

/**
 * Web search tool using Google Custom Search JSON API
 * Docs: https://developers.google.com/custom-search/v1/introduction
 * Free tier: 100 queries/day
 */
export const webSearchTool: Tool = {
  name: 'web_search',
  description: 'Search the web for information using Google. Returns title, URL, and snippet for each result. Use this for current events, facts, or any question requiring up-to-date information.',
  
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query to look up',
      },
      num_results: {
        type: 'number',
        description: 'Number of results to return (default: 5, max: 10)',
        default: 5,
      },
    },
    required: ['query'],
  },
  execute: async (args: Record<string, unknown>, _context: AgentContext): Promise<{tool_call_id: string; result: string; success: boolean; error?: string}> => {
    try {
      const { query, num_results = 5 } = args as { query: string; num_results?: number };
      
      const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
      const engineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
      
      if (!apiKey || !engineId) {
        // Fallback to Tavily if Google not configured
        return webSearchTavily(query, num_results);
      }

      const url = new URL('https://www.googleapis.com/customsearch/v1');
      url.searchParams.set('key', apiKey);
      url.searchParams.set('cx', engineId);
      url.searchParams.set('q', query);
      url.searchParams.set('num', String(Math.min(num_results, 10)));

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Google Search API error: ${response.status}`);
      }

      const data = await response.json() as {
        items?: Array<{
          title: string;
          link: string;
          snippet: string;
        }>;
      };

      if (!data.items || data.items.length === 0) {
        return {
          tool_call_id: '',
          result: JSON.stringify({ query, results: [], message: 'No results found' }),
          success: true,
        };
      }

      const results = data.items.map(item => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
      }));

      return {
        tool_call_id: '',
        result: JSON.stringify({
          query,
          results,
          count: results.length,
          source: 'google',
        }),
        success: true,
      };

    } catch (error) {
      console.error('[WebSearch] Error:', error);
      return {
        tool_call_id: '',
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

/**
 * Fallback to Tavily AI-optimized search
 */
async function webSearchTavily(query: string, numResults: number): Promise<{tool_call_id: string; result: string; success: boolean; error?: string}> {
  const apiKey = process.env.TAVILY_API_KEY;
  
  if (!apiKey) {
    return {
      tool_call_id: '',
      result: '',
      success: false,
      error: 'No search API configured. Set GOOGLE_SEARCH_API_KEY or TAVILY_API_KEY in environment.',
    };
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: numResults,
        include_answer: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`);
    }

    const data = await response.json() as {
      results?: Array<{ title: string; url: string; content: string }>;
      answer?: string;
    };

    const results = (data.results || []).map(item => ({
      title: item.title,
      url: item.url,
      snippet: item.content.substring(0, 300),
    }));

    return {
      tool_call_id: '',
      result: JSON.stringify({
        query,
        results,
        answer: data.answer,
        count: results.length,
        source: 'tavily',
      }),
      success: true,
    };

  } catch (error) {
    return {
      tool_call_id: '',
      result: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}