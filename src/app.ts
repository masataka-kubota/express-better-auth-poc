import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import express from 'express';

import { auth } from '@/lib/auth';

const app = express();
const port = 3000;

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.get('/api/me', async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });

  return res.json(session);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
