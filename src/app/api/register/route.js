import { NextResponse } from 'next/server';
import { registerTeam } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { teamName, mission, leader, members } = body || {};

    // Validate Team Name
    if (!teamName || typeof teamName !== 'string' || !teamName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Squad/Team Name is required.' },
        { status: 400 }
      );
    }

    // Validate Leader
    if (!leader || typeof leader !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Squad Leader information is required.' },
        { status: 400 }
      );
    }

    const { name: leaderName, uid: leaderUid, phone: leaderPhone, email: leaderEmail } = leader;

    if (!leaderName?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Leader Full Name is required.' },
        { status: 400 }
      );
    }

    if (!leaderUid?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Leader Student UID / Roll Number is required.' },
        { status: 400 }
      );
    }

    if (!leaderPhone?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Leader Contact Number is required.' },
        { status: 400 }
      );
    }

    if (!leaderEmail?.trim() || !leaderEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid Leader Email address is required.' },
        { status: 400 }
      );
    }

    // Validate additional members (if provided)
    const sanitizedMembers = [];
    if (Array.isArray(members)) {
      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        if (m && (m.name || m.uid || m.email || m.phone)) {
          if (!m.name?.trim()) {
            return NextResponse.json(
              { success: false, error: `Member ${i + 2} name is required.` },
              { status: 400 }
            );
          }
          sanitizedMembers.push({
            name: m.name.trim(),
            uid: (m.uid || '').trim(),
            phone: (m.phone || '').trim(),
            email: (m.email || '').trim(),
          });
        }
      }
    }

    // Execute registration with Neon DB (or resilient in-memory fallback)
    const result = await registerTeam({
      teamName: teamName.trim(),
      mission: (mission || '').trim() || 'Mission 01: The Veil',
      leader: {
        name: leaderName.trim(),
        uid: leaderUid.trim(),
        phone: leaderPhone.trim(),
        email: leaderEmail.trim(),
      },
      members: sanitizedMembers,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Squad domain initialized successfully!',
        teamId: result.teamId,
        teamName: result.teamName,
        mission: result.mission,
        createdAt: result.createdAt,
        totalMembers: result.totalMembers,
        source: result.source,
        note: result.note,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[API /api/register Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while registering squad.' },
      { status: 500 }
    );
  }
}
