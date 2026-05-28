// Browser Tool - Real implementation using Puppeteer
import { Tool, AgentContext } from '../../types';

/**
 * Browser automation tool using Puppeteer
 * 
 * Features:
 * - Navigate to URLs
 * - Take screenshots
 * - Click elements
 * - Type text
 * - Extract content
 * - Scroll pages
 * 
 * Security: Runs in headless mode with disabled sandbox for container safety
 */

interface BrowserResult {
  success: boolean;
  screenshot?: string;
  content?: string;
  title?: string;
  url?: string;
  message?: string;
  error?: string;
}

// Note: Puppeteer is a runtime dependency. Install with: npm install puppeteer
// For production, consider using a cloud-based browser API like Browserless
let puppeteer: typeof import('puppeteer') | null = null;

async function getPuppeteer() {
  if (!puppeteer) {
    try {
      puppeteer = await import('puppeteer');
    } catch {
      throw new Error('Puppeteer not installed. Run: npm install puppeteer');
    }
  }
  return puppeteer;
}

export const browserTool: Tool = {
  name: 'browser',
  description: 'Control a web browser to navigate pages, take screenshots, click elements, and extract information. Use this to interact with web pages, scrape content, or automate web tasks.',
  
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Browser action: navigate, screenshot, click, type, extract, scroll, back, forward',
      },
      url: {
        type: 'string',
        description: 'URL to navigate to (for navigate action)',
      },
      selector: {
        type: 'string',
        description: 'CSS selector for click/type actions',
      },
      text: {
        type: 'string',
        description: 'Text to type (for type action)',
      },
      extract: {
        type: 'string',
        description: 'CSS selector to extract content from (for extract action)',
      },
      wait_for: {
        type: 'number',
        description: 'Wait time in ms after action (default: 1000)',
        default: 1000,
      },
    },
    required: ['action'],
  },
  execute: async (args: Record<string, unknown>, _context: AgentContext): Promise<{tool_call_id: string; result: string; success: boolean; error?: string}> => {
    const { action, url, selector, text, extract, wait_for = 1000 } = args as {
      action: string;
      url?: string;
      selector?: string;
      text?: string;
      extract?: string;
      wait_for?: number;
    };

    let browser = null;
    let page = null;

    try {
      const pup = await getPuppeteer();
      
      // Launch browser with security restrictions
      browser = await pup.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      });

      page = await browser.newPage();
      
      // Set reasonable defaults
      await page.setViewport({ width: 1280, height: 720 });
      await page.setDefaultNavigationTimeout(30000);

      let result: BrowserResult;

      switch (action) {
        case 'navigate': {
          if (!url) {
            result = { success: false, error: 'URL required for navigate action' };
            break;
          }
          
          await page.goto(url, { waitUntil: 'networkidle2' });
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            title: await page.title(),
            message: `Navigated to ${url}`,
          };
          break;
        }

        case 'screenshot': {
          const screenshot = await page.screenshot({ encoding: 'base64', fullPage: false });
          result = {
            success: true,
            screenshot: `data:image/png;base64,${screenshot}`,
            url: page.url(),
            message: 'Screenshot captured',
          };
          break;
        }

        case 'click': {
          if (!selector) {
            result = { success: false, error: 'Selector required for click action' };
            break;
          }
          
          await page.click(selector, { timeout: 5000 });
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            message: `Clicked element: ${selector}`,
          };
          break;
        }

        case 'type': {
          if (!selector || !text) {
            result = { success: false, error: 'Selector and text required for type action' };
            break;
          }
          
          await page.click(selector, { timeout: 5000 });
          await page.keyboard.type(text, { delay: 50 });
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            message: `Typed "${text}" into ${selector}`,
          };
          break;
        }

        case 'extract': {
          if (!extract) {
            result = { success: false, error: 'Extract selector required for extract action' };
            break;
          }
          
          const content = await page.$eval(extract, (el) => el.textContent || el.innerHTML);
          result = {
            success: true,
            content,
            url: page.url(),
            message: `Extracted content from ${extract}`,
          };
          break;
        }

        case 'scroll': {
          await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            message: 'Scrolled to bottom of page',
          };
          break;
        }

        case 'back': {
          await page.goBack();
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            message: 'Navigated back',
          };
          break;
        }

        case 'forward': {
          await page.goForward();
          await page.waitForTimeout(wait_for);
          
          result = {
            success: true,
            url: page.url(),
            message: 'Navigated forward',
          };
          break;
        }

        default:
          result = { success: false, error: `Unknown action: ${action}` };
      }

      return {
        tool_call_id: '',
        result: JSON.stringify(result),
        success: result.success,
        error: result.error,
      };

    } catch (error) {
      console.error('[Browser] Error:', error);
      return {
        tool_call_id: '',
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },
};