import { Container } from 'inversify';
import { UserService } from './user-service.interface.js';
import { Component } from '../../../types/index.js';
import { DefaultUserService } from './index.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';

export function createUserContainer(parent?: Container) {
  const container = new Container({ parent });

  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return container;
}
