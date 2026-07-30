/**
 * Parse comma-separated frontend origins from the environment variable.
 *
 * @param value - Comma-separated list of origins (e.g. `"http://localhost:5173,http://localhost:4173"`)
 */
export const parseFrontendOrigins = (value: string): string[] => {
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
};
