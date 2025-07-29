import { MastraClient } from '@mastra/client-js';

export const baseUrl = import.meta.env.VITE_MASTRA_BASE_URL || 'http://localhost:4111';

export const mastraClient = new MastraClient({
  baseUrl,
});

export default mastraClient; 