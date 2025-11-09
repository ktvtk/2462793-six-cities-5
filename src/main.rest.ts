#!/usr/bin/env nodeimport { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import 'reflect-metadata';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import {createCommentContainer} from './shared/modules/comment/index.js';
import {Container} from 'inversify';
import {createFavoritesContainer} from './shared/modules/favorites/favorites.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createFavoritesContainer(),
  );


  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
