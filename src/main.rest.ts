#!/usr/bin/env nodeimport { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import 'reflect-metadata';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';

async function bootstrap() {
  const restContainer = createRestApplicationContainer();
  const userContainer = createUserContainer(restContainer);
  const offerContainer = createOfferContainer(userContainer);

  const app = offerContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
