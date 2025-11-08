#!/usr/bin/env nodeimport { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import 'reflect-metadata';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import {createCommentContainer} from "./shared/modules/comment";
import {Container} from 'inversify';

async function bootstrap() {
  const appContainer = Container.merge(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
  )


  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
