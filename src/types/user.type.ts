export enum UserType {
  ordinary = 'ordinary',
  pro = 'pro',
}

export interface User {
  name: string;
  email: string;
  avatar?: string | null;
  type: UserType;
}
