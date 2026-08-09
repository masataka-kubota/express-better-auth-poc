import { connect } from '@tidbcloud/serverless';
import { drizzle as drizzleMySql } from 'drizzle-orm/mysql2';
import { drizzle as drizzleTiDB } from 'drizzle-orm/tidb-serverless';
import { createPool } from 'mysql2';

import { env, isDev } from '@/lib/env';

export const db = isDev
  ? drizzleMySql({
      client: createPool(env.databaseUrl)
    })
  : drizzleTiDB({
      client: connect({ url: env.databaseUrl })
    });
