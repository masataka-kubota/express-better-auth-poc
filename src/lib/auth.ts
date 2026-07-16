import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';

import { db } from '@/db';
import { authSchema } from '@/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: authSchema
  }),
  emailAndPassword: { enabled: true },
  baseUrl: process.env.BETTER_AUTH_URL!,
  trustedOrigin: process.env.BETTER_AUTH_URL!
});
