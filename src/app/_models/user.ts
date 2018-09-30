export class User {
  id: number;
  password: string;
  name: string;
  email: string;
  userType: UserType;
}

export type UserType = 'lawyer' | 'client';
