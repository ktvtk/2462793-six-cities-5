export enum UserType {
  ordinary = 'ordinary',
  pro = 'pro',
}

export interface User {
  name: string; // 1..15
  email: string;
  avatar?: string | null;
  type: UserType;
}
