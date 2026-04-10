import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ count: 0, error: 'Missing env variables' }, { status: 500 });
  }

  try {
    const redis = new Redis({ url, token });
    const count = (await redis.get('portfolio_visitors')) || 0;
    return NextResponse.json({ count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ count: 0, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  void request; // acknowledge the parameter
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ count: 0, error: 'Missing env variables' }, { status: 500 });
  }

  try {
    const redis = new Redis({ url, token });
    const count = await redis.incr('portfolio_visitors');
    return NextResponse.json({ count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ count: 0, error: errorMessage }, { status: 500 });
  }
}
