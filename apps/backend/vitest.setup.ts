import { afterEach, beforeEach } from 'vitest';

const baseEnv = { ...process.env };
const testEnv = {
  DATABASE_URL: 'mysql://app_user:app_password@127.0.0.1:3307/my_app_db',
  BETTER_AUTH_URL: 'http://localhost:3000',
  BETTER_AUTH_SECRET: 'test-secret',
  FRONTEND_URLS: 'http://localhost:5173',
  SMTP_FROM: 'noreply@localhost',
  PORT: '3000',
  NODE_ENV: 'test'
};

const applyTestEnv = () => {
  process.env = {
    ...baseEnv,
    ...testEnv
  };
};

applyTestEnv();

beforeEach(() => {
  applyTestEnv();
});

afterEach(() => {
  process.env = { ...baseEnv };
});
