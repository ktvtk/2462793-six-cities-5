import {FavoriteEntity} from './favorite.entity.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/index.js';

export interface FavoriteService {
  find(userId?: string): Promise<DocumentType<OfferEntity>[]>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>;
  findByUserAndOffer(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null>;
  deleteByUserAndOffer(userId: string, offerId: string): Promise<boolean>;
  addToFavorites(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null>;
  removeFromFavorites(userId: string, offerId: string): Promise<boolean>;
  getFavoriteOfferIds(userId: string): Promise<string[]>;
}
