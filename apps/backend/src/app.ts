import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';

import { env } from '@/lib/env';
import { auth } from '@/lib/auth';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
