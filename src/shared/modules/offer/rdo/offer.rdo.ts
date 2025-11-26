import {Expose, Type} from 'class-transformer';
import {City, Goods, OfferType} from '../../../../types/index.js';
import {UserRdo} from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose()
  public rooms: number;

  @Expose()
  public maxGuests: number;

  @Expose()
  public goods: Goods[];

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: {
    latitude: number;
    longitude: number;
  };
}
