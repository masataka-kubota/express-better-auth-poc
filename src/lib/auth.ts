import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';

import { db } from '@/db';
import { authSchema } from '@/db/schema';

const betterAuthUrl = process.env.BETTER_AUTH_URL;
const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const frontendUrl = process.env.FRONTEND_URL;

if (!betterAuthUrl) {
  throw new Error(
    '❌ BETTER_AUTH_URL is not defined. Please set the BETTER_AUTH_URL environment variable.'
  );
}

if (!betterAuthSecret) {
  throw new Error(
    '❌ BETTER_AUTH_SECRET is not defined. Please set the BETTER_AUTH_SECRET environment variable.'
  );
}

if (!frontendUrl) {
  throw new Error(
    '❌ FRONTEND_URL is not defined. Please set the FRONTEND_URL environment variable.'
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: authSchema
  }),
  emailAndPassword: { enabled: true },
  baseUrl: betterAuthUrl,
  secret: betterAuthSecret,
  trustedOrigins: [frontendUrl]
});
