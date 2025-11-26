import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {Goods, City, OfferType} from '../../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

export class LocationEntity {
  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop({trim: true, required: true})
  public title: string;

  @prop({trim: true, required: true})
  public description: string;

  @prop({required: true})
  public postDate: string;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city: City;

  @prop({required: true})
  public previewImage: string;

  @prop({
    required: true,
    type: [String],
    validate: {
      validator: (images: string[]) => images.length === 6,
      message: 'Images array must contain exactly 6 images'
    }
  })
  public images: string[];

  @prop({
    required: true,
    default: false
  })
  public isPremium: boolean;

  @prop({
    required: true,
    default: false
  })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    set: (val: number) => Math.round(val * 10) / 10
  })
  public rating: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public type: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public rooms: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public maxGuests: number;

  @prop({required: true})
  public price: number;

  @prop({
    required: true,
    enum: Goods,
    type: () => [String]
  })
  public goods: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId: Ref<UserEntity>;

  @prop({
    default: 0,
    min: 0
  })
  public commentsCount: number;

  @prop({
    required: true,
    type: LocationEntity
  })
  public coordinates: LocationEntity;
}

export const OfferModel = getModelForClass(OfferEntity);
