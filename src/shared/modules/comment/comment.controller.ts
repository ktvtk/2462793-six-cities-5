import {inject, injectable} from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../libs/rest/index.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../../types/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { OfferService } from '../offer/index.js';
import { CommentService } from './comment-service.interface.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import {fillDto} from '../../helpers/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDTO>,
    res: Response
  ): Promise<void> {


    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDto(CommentRdo, comment));
  }
}
