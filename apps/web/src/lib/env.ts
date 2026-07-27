/**
 * Reads a required environment variable.
 *
 * @param name - Environment variable name (e.g. `"VITE_BACKEND_BASE_URL"`)
 * @returns The non-empty trimmed value
 * @throws If the variable is missing or empty
 */
const requireEnv = (name: string): string => {
  const value = import.meta.env[name]?.trim();
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
   * Backend base URL (`VITE_BACKEND_BASE_URL`).
   * Public origin of the backend API (e.g. `http://localhost:3000`).
   */
  backendBaseUrl: requireEnv('VITE_BACKEND_BASE_URL'),
} as const;
