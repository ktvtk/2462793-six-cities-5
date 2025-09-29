export function isTypeOf<A extends string>(str: string, array: Readonly<Array<A>>): A | undefined {
  const foundKey = array.find((value) => value === str);

  if (!foundKey) {
    return;
  }

  return foundKey;
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export enum Goods {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export type UserType = 'ordinary' | 'pro' ;

export interface UserInput {
  name: string; // 1..15
  email: string;
  avatar?: string | null;
  password: string; // 6..12
  type: UserType;
}

export interface CommentInput {
  text: string; // 5..1024
  date?: string;
  rating: number; // 1..5
  authorEmail: string;
}

export interface OfferInput {
  title: string;
  description: string;
  postDate: string;
  city: City;
  previewImage: string;
  images: Array<string>; // 6
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; // 1..5
  type: OfferType;
  rooms: number; // 1..8
  guests: number; // 1..10
  price: number; // 100..100000
  goods: Goods[];
  authorEmail: string;
  coordinates: {
    latitude: number,
    longitude: number,
  };
}

export interface Offer extends OfferInput {
  id: string;
  commentsCount: number;
}
