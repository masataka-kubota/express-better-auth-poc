import { sql } from 'drizzle-orm';

/**
 * Shared default used for timestamp columns.
 * This keeps the generated SQL compatible with TiDB while remaining usable in MySQL.
 */
export const currentTimestampDefault = sql.raw('CURRENT_TIMESTAMP(3)');
