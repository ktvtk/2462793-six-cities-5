import {Container} from 'inversify';
import {Component} from '../../../types/index.js';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity';
import {CommentService} from './comment-service.interface';
import {DefaultCommentService} from './default-comment-service.js';

export function createCommentContainer () {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return container;
}
