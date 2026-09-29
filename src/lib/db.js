import { neon, neonConfig } from '@neondatabase/serverless';

// In-memory fallback if DATABASE_URL is not yet provided
let memoryTeams = [];

/**
 * Get SQL executor for Neon Database
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }
  return neon(databaseUrl);
}

/**
 * Initialize the Neon database table for NexaSoul BuildSprint registrations
 */
export async function initDb() {
  const sql = getDb();
  if (!sql) {
    console.warn('[Neon DB] DATABASE_URL not detected. Running in memory fallback mode.');
    return false;
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS nexasoul_teams (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        leader_name VARCHAR(255) NOT NULL,
        leader_uid VARCHAR(100) NOT NULL,
        leader_phone VARCHAR(50) NOT NULL,
        leader_email VARCHAR(255) NOT NULL,
        members JSONB NOT NULL,
        total_members INT NOT NULL,
        cursed_grade VARCHAR(50) DEFAULT 'Special Grade',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('[Neon DB] Table nexasoul_teams verified/created successfully.');
    return true;
  } catch (error) {
    console.error('[Neon DB] Error initializing table:', error);
    return false;
  }
}

/**
 * Register a new squad into Neon database
 */
export async function registerTeam({ teamName, leader, members }) {
  const totalMembers = 1 + (members?.length || 0);
  const sql = getDb();

  if (sql) {
    try {
      // Ensure table exists
      await initDb();

      // Insert team record
      const result = await sql`
        INSERT INTO nexasoul_teams (
          team_name,
          leader_name,
          leader_uid,
          leader_phone,
          leader_email,
          members,
          total_members
        ) VALUES (
          ${teamName},
          ${leader.name},
          ${leader.uid},
          ${leader.phone},
          ${leader.email},
          ${JSON.stringify(members || [])}::jsonb,
          ${totalMembers}
        )
        RETURNING id, team_name, created_at;
      `;

      return {
        success: true,
        source: 'neon_database',
        teamId: result[0]?.id ? `TEAM-${result[0].id}` : `TEAM-${Date.now()}`,
        numericId: result[0]?.id,
        teamName: result[0]?.team_name,
        createdAt: result[0]?.created_at,
        totalMembers,
      };
    } catch (err) {
      console.error('[Neon DB] Insert failed, falling back to memory store:', err);
    }
  }

  // Fallback to in-memory store for local testing
  const fallbackId = `JJK-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    id: fallbackId,
    team_name: teamName,
    leader_name: leader.name,
    leader_uid: leader.uid,
    leader_phone: leader.phone,
    leader_email: leader.email,
    members: members || [],
    total_members: totalMembers,
    cursed_grade: 'Special Grade',
    created_at: new Date().toISOString(),
  };
  memoryTeams.unshift(record);

  return {
    success: true,
    source: 'local_memory_fallback',
    note: 'Database URL not set; stored locally. Add DATABASE_URL to .env.local for live Neon persistence.',
    teamId: fallbackId,
    teamName,
    createdAt: record.created_at,
    totalMembers,
  };
}

/**
 * Fetch all registered squads
 */
export async function getTeams() {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      const rows = await sql`
        SELECT 
          id,
          team_name,
          leader_name,
          leader_email,
          total_members,
          cursed_grade,
          created_at
        FROM nexasoul_teams
        ORDER BY created_at DESC;
      `;
      return { teams: rows, source: 'neon_database' };
    } catch (err) {
      console.error('[Neon DB] Query failed:', err);
    }
  }

  return { teams: memoryTeams, source: 'local_memory_fallback' };
}

/**
 * Check DB connection status
 */
export async function checkDbStatus() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return {
      connected: false,
      configured: false,
      mode: 'in_memory_fallback',
      message: 'DATABASE_URL is not configured. Registrations are stored in temporary memory.',
    };
  }

  try {
    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name;`;
    return {
      connected: true,
      configured: true,
      mode: 'neon_database',
      timestamp: result[0]?.current_time,
      database: result[0]?.db_name,
      message: 'Successfully connected to Neon serverless PostgreSQL.',
    };
  } catch (error) {
    return {
      connected: false,
      configured: true,
      mode: 'error_fallback',
      message: `Failed to connect to Neon: ${error.message}`,
    };
  }
}
