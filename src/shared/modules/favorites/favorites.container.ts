import {Container} from 'inversify';
import {FavoriteService} from './favorite-service.interface.js';
import {Component} from '../../../types/index.js';
import {DefaultFavoriteService} from './default-favorite-service.js';
import {types} from '@typegoose/typegoose';
import {FavoriteEntity, FavoriteModel} from './favorite.entity.js';

export function createFavoritesContainer () {
  const container = new Container();

  container.bind<FavoriteService>(Component.FavoriteService).to(DefaultFavoriteService).inSingletonScope();
  container.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);

  return container;
}
