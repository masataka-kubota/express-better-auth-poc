import 'dotenv/config';

/**
 * Reads a required environment variable.
 *
 * @param name - Environment variable name (e.g. `"DATABASE_URL"`)
 * @returns The non-empty trimmed value
 * @throws If the variable is missing or empty
 */
const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`❌ ${name} is not defined. Please set the ${name} environment variable.`);
  }
  return value;
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
   * Frontend origin (`FRONTEND_URL`).
   * Used for Express CORS allowlist and Better Auth `trustedOrigins`.
   * Example (Vite): `http://localhost:5173`
   */
  frontendUrl: requireEnv('FRONTEND_URL')
} as const;
