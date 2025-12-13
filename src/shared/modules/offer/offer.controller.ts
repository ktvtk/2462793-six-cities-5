import {inject, injectable} from 'inversify';
import {BaseController, HttpError, HttpMethod, ValidateObjectIdMiddleware} from '../../libs/rest/index.js';
import {Component} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {Request, Response} from 'express';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {StatusCodes} from 'http-status-codes';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';
import {offerIdType} from '../../../types/offerId.type.js';
import {CommentService} from '../comment/index.js';
import {ValidateDtoMiddleware} from '../../libs/rest/middleware/index.js';
import {CommentRdo} from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDTO)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDTO),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDto(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDto(OfferRdo, result));
  }

  public async show(
    { params }: Request<offerIdType>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'OfferController');
    }

    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async update(
    { params, body }: Request<offerIdType, Record<string, unknown>, UpdateOfferDTO>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const existOffer = await this.offerService.findById(offerId);
    if (!existOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'OfferController');
    }

    const result = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDto(OfferRdo, result));
  }

  public async delete(
    { params }: Request<offerIdType>, res: Response
  ): Promise<void> {
    const { offerId } = params;
    const existOffer = await this.offerService.findById(offerId);
    if (!existOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'OfferController');
    }
    await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, {});
  }

  public async getComments({ params }: Request<offerIdType>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }
}
