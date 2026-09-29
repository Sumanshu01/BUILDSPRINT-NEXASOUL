import { NextResponse } from 'next/server';
import { checkDbStatus } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await checkDbStatus();
    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json(
      { connected: false, error: err.message },
      { status: 500 }
    );
  }
}
