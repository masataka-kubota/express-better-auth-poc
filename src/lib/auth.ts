import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';

import { db } from '@/db';
import { authSchema } from '@/db/schema';
import { env } from '@/lib/env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: authSchema
  }),
  emailAndPassword: { enabled: true },
  baseUrl: env.betterAuthUrl,
  secret: env.betterAuthSecret,
  trustedOrigins: [env.frontendUrl]
});
