import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';

import { auth } from '@/lib/auth';
import { env } from '@/lib/env';

export const app = express();

app.use(
  cors({
    origin: env.frontendUrls,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});
