import { parseFrontendOrigins } from '@/lib/parseFrontendOrigins';
import 'dotenv/config';

/**
 * Reads a required environment variable.
 *
 * @param name - Environment variable name (e.g. `"DATABASE_URL"`)
 * @returns The non-empty trimmed value
 * @throws If the variable is missing or empty
 */
export const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`❌ ${name} is not defined. Please set the ${name} environment variable.`);
  }
  return value;
};

/**
 * Reads an environment variable as a positive integer.
 *
 * @param name - Environment variable name (e.g. `"PORT"`)
 * @param fallback - Default value used when the variable is unset or empty
 * @returns The parsed positive integer
 * @throws If the value is missing, invalid, or not a positive integer
 */
export const parsePositiveIntegerEnv = (name: string, fallback?: number): number => {
  const rawValue = process.env[name]?.trim();
  const effectiveValue =
    rawValue && rawValue !== ''
      ? rawValue
      : fallback !== undefined
        ? String(fallback)
        : requireEnv(name);

  if (!/^\d+$/.test(effectiveValue)) {
    throw new Error(`❌ ${name} is not a valid positive integer: "${effectiveValue}"`);
  }

  const parsed = Number.parseInt(effectiveValue, 10);

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`❌ ${name} is not a valid positive integer: "${effectiveValue}"`);
  }

  return parsed;
};

/**
 * Required environment variables for app startup.
 * Throws when this module is loaded if any key is missing.
 */
export const env = {
  /**
   * MySQL connection URL (`DATABASE_URL`).
   * Used by Drizzle / mysql2.
   * Example: `mysql://user:password@127.0.0.1:3307/my_app_db`
   */
  databaseUrl: requireEnv('DATABASE_URL'),

  /**
   * Better Auth base URL (`BETTER_AUTH_URL`).
   * Public origin of the auth API (e.g. `http://localhost:3000`).
   */
  betterAuthUrl: requireEnv('BETTER_AUTH_URL'),

  /**
   * Better Auth signing secret (`BETTER_AUTH_SECRET`).
   * Used to sign session cookies and related tokens.
   * Generate with e.g. `openssl rand -base64 32`.
   */
  betterAuthSecret: requireEnv('BETTER_AUTH_SECRET'),

  /**
   * Frontend origins parsed from `FRONTEND_URLS`.
   * Used by Express CORS and Better Auth trusted origins.
   * Example (Vite): `http://localhost:5173,http://localhost:4173`
   */
  frontendUrls: parseFrontendOrigins(requireEnv('FRONTEND_URLS')),

  /**
   * Resend API key for sending emails in production.
   * Not required in development (Mailpit is used instead).
   */
  resendApiKey: process.env.RESEND_API_KEY?.trim() || undefined,

  /**
   * Sender email address used in the `from` field of outgoing emails.
   * Example: `noreply@yourdomain.com`
   */
  smtpFrom: requireEnv('SMTP_FROM'),

  /**
   * Port used by the HTTP server.
   * Optional; defaults to 3000 when unset.
   * Cloud Run and local development both use this value.
   */
  port: parsePositiveIntegerEnv('PORT', 3000)
} as const;

/**
 * Whether the app is running in development mode.
 * Derived from `NODE_ENV`.
 */
export const isDev = process.env.NODE_ENV === 'development';
