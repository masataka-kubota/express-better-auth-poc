import { connect } from '@tidbcloud/serverless';
import { drizzle as drizzleMySql } from 'drizzle-orm/mysql2';
import { drizzle as drizzleTiDB } from 'drizzle-orm/tidb-serverless';
import { createPool } from 'mysql2';

import { env, isDev } from '@/lib/env';

const mysqlPool = createPool(env.databaseUrl);
const tidbClient = connect({ url: env.databaseUrl });

export const db = isDev ? drizzleMySql({ client: mysqlPool }) : drizzleTiDB({ client: tidbClient });
