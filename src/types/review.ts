import { User } from './user';

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type ReviewInfo = {
  offerId: string;
  comment: string;
  rating: number;
};
