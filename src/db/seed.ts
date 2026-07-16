import { auth } from '@/lib/auth';

async function main() {
  try {
    const newUser = await auth.api.signUpEmail({
      body: {
        email: 'test@example.com',
        password: 'secure_password_123',
        name: 'テストユーザー'
      }
    });

    console.log('シード完了', newUser.user.id);
  } catch (error) {
    console.error('シードに失敗しました:', error);
  }
}

main();
