export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Invited';
  bio: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: 'ada',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Admin',
    status: 'Active',
    bio: 'First programmer. Full access to console settings.',
  },
  {
    id: 'grace',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Editor',
    status: 'Active',
    bio: 'Can manage content and invite viewers.',
  },
  {
    id: 'alan',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Viewer',
    status: 'Invited',
    bio: 'Read-only access until the invite is accepted.',
  },
];

export function getDemoUser(userId: string) {
  return demoUsers.find((user) => user.id === userId);
}
