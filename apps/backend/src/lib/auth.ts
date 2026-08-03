import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';

import { db } from '@/db';
import { authSchema } from '@/db/schema';
import { env } from '@/lib/env';
import { sendEmail } from '@/lib/mail';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: authSchema
  }),
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
        text: `Click the link to verify your email: ${url}`
      }).catch((error) => {
        console.error('❌ Failed to send verification email', error);
      });
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
        text: `Click the link to reset your password: ${url}`
      }).catch((error) => {
        console.error('❌ Failed to send password reset email', error);
      });
    }
  },
  baseUrl: env.betterAuthUrl,
  secret: env.betterAuthSecret,
  trustedOrigins: env.frontendUrls
});
