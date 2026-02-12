import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

if (process.env.NODE_ENV === 'development') {
  neonConfig.fetchEndpoint = 'http://neon-local:5432/sql';
  neonConfig.useSecureWebSocket = 'false';
  neonConfig.poolQueryViaFetch = 'true';
}
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export { db, sql };
