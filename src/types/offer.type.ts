import {City} from './city.enum.js';
import {OfferType} from './offer-type.enum.js';
import {Goods} from './goods.enum.js';

export interface OfferInput {
  title: string;
  description: string;
  postDate: string;
  city: City;
  previewImage: string;
  images: string[]; // 6
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; // 1..5
  type: OfferType;
  rooms: number; // 1..8
  maxGuests: number; // 1..10
  price: number; // 100..100000
  goods: Goods[];
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  coordinates: {
    latitude: number,
    longitude: number,
  };
}

export interface Offer extends OfferInput {
  id: string;
  commentsCount: number;
}
