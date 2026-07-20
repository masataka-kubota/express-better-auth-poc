import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';

import { env } from '@/env';

const pool = createPool(env.databaseUrl);

export const db = drizzle({ client: pool });
