import { NextResponse } from 'next/server';
import { getTeams } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await getTeams();
    return NextResponse.json({
      success: true,
      count: result.teams?.length || 0,
      teams: result.teams || [],
      source: result.source,
    });
  } catch (err) {
    console.error('[API /api/teams Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve registered squads.' },
      { status: 500 }
    );
  }
}
