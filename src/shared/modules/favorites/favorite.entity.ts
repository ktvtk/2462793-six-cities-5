import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/index.js';
import {UserEntity} from '../user/index.js';

export interface FavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites'
  }
})
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    ref: () => UserEntity
  })
  public user: Ref<UserEntity>;

  @prop({
    required: true,
    ref: () => OfferEntity
  })
  public offer: Ref<OfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
