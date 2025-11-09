import {FavoriteEntity} from './favorite.entity.js';
import {DocumentType} from '@typegoose/typegoose';

export interface FavoriteService {
  find(): Promise<DocumentType<FavoriteEntity>[]>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>;
  findByUserAndOffer(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null>;
  deleteByUserAndOffer(userId: string, offerId: string): Promise<boolean>;
  addToFavorites(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null>;
  removeFromFavorites(userId: string, offerId: string): Promise<boolean>;
  getFavoriteOfferIds(userId: string): Promise<string[]>;
}
