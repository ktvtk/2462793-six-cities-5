import { FavoriteService } from './favorite-service.interface.js';
import {DocumentType} from '@typegoose/typegoose';
import { injectable } from 'inversify';
import {FavoriteEntity, FavoriteModel} from './favorite.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  public async findById(id: string): Promise<DocumentType<FavoriteEntity> | null> {
    return await FavoriteModel.findById(id)
      .populate(['user', 'offer'])
      .exec();
  }

  public async find(): Promise<DocumentType<FavoriteEntity>[]> {
    return FavoriteModel
      .find()
      .populate(['user', 'offer'])
      .exec();
  }

  public async findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return await FavoriteModel.find({ user: userId })
      .populate(['user', 'offer'])
      .exec();
  }

  public async findByUserAndOffer(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null> {
    return await FavoriteModel.findOne({ user: userId, offer: offerId })
      .populate(['user', 'offer'])
      .exec();
  }

  public async deleteByUserAndOffer(userId: string, offerId: string): Promise<boolean> {
    const result = await FavoriteModel.findOneAndDelete({ user: userId, offer: offerId }).exec();
    return !!result;
  }

  public async addToFavorites(userId: string, offerId: string): Promise<DocumentType<FavoriteEntity> | null> {
    const existing = await this.findByUserAndOffer(userId, offerId);
    if (existing) {
      return existing;
    }

    const favorite = new FavoriteModel({ user: userId, offer: offerId });
    return await favorite.save();
  }

  public async removeFromFavorites(userId: string, offerId: string): Promise<boolean> {
    return await this.deleteByUserAndOffer(userId, offerId);
  }

  public async getFavoriteOfferIds(userId: string): Promise<string[]> {
    const favorites = await FavoriteModel.find({ user: userId }).select('offer').exec();
    return favorites.map((fav) => fav.offer.toString());
  }
}
