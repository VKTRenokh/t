export interface Profile {
  role: 'manager' | 'user';
  name: string | null;
  email: string;
}
