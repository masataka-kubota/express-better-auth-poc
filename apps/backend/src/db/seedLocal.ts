import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { user } from '@/db/schema/auth-schema';
import { auth } from '@/lib/auth';

const main = async () => {
  try {
    const newUser = await auth.api.signUpEmail({
      body: {
        email: 'test@example.com',
        password: 'secure_password_123',
        name: 'テストユーザー'
      }
    });

    const userId = newUser.user.id;
    console.log('ユーザー作成完了:', userId);

    await db.update(user).set({ emailVerified: true }).where(eq(user.id, userId));

    console.log('シード完了', userId);
  } catch (error) {
    console.error('シードに失敗しました:', error);
  } finally {
    process.exit(0);
  }
};

main();
