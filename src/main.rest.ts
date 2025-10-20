import {RestApplication} from './rest/index.js';
import {Logger, PinoLogger} from './shared/libs/logger/index.js';
import {Container} from 'inversify';
import {Component} from './types/index.js';
import {Config} from './shared/libs/config/index.js';
import {RestSchema} from './shared/libs/config/index.js';
import {RestConfig} from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
