import { app } from '@/app';
import { env } from '@/lib/env';

app.listen(env.port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${env.port}`);
});
