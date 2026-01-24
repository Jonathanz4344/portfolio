import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Vercel KV uses these variable names
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return new Response(JSON.stringify({ count: 0, error: 'Missing env variables' }), { 
      headers,
      status: 500 
    });
  }

  try {
    const redis = new Redis({ url, token });

    if (request.method === 'POST') {
      // Increment and return new count
      const count = await redis.incr('portfolio_visitors');
      return new Response(JSON.stringify({ count }), { headers });
    } else {
      // Just get current count
      const count = (await redis.get('portfolio_visitors')) || 0;
      return new Response(JSON.stringify({ count }), { headers });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ count: 0, error: errorMessage }), { 
      headers,
      status: 500 
    });
  }
}
