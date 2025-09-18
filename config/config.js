import 'dotenv/config';

export const config = {
  default: process.env.DEFAULT_ENGINE || 'gemini',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  CHATGPT_API_KEY: process.env.CHATGPT_API_KEY || ''
};
