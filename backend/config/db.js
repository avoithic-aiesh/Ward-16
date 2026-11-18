/**
 * backend/config/db.js
 *
 * Traditional PostgreSQL connection pool using 'pg'.
 * Configured via DATABASE_URL or standard environment variables:
 * PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT.
 */

const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'ward16_heritage',
    };

const pool = new Pool(poolConfig);

let isConnected = false;

pool.on('connect', () => {
  isConnected = true;
  console.log('[PostgreSQL] Connected to database pool.');
});

pool.on('error', (err) => {
  console.warn('[PostgreSQL Pool Warning]', err.message);
});

// Test connection on startup
async function testConnection() {
  try {
    const client = await pool.connect();
    isConnected = true;
    const res = await client.query('SELECT NOW() as current_time');
    client.release();
    console.log('[PostgreSQL] Database verified. Current server time:', res.rows[0].current_time);
    return true;
  } catch (err) {
    console.warn('[PostgreSQL Notice] Could not connect to local PostgreSQL instance:', err.message);
    console.warn('[PostgreSQL Notice] In-memory archive fallback will be active for development if DB is offline.');
    isConnected = false;
    return false;
  }
}

// Universal query helper
async function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  pool,
  query,
  testConnection,
  isDbConnected: () => isConnected,
};
