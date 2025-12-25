import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component, offerIdType} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from '../offer/index.js';
import {Request, Response} from 'express';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from '../offer/rdo/offer.rdo.js';
import {
  ExistingDocumentMiddleware,
  PrivateRouteMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/middleware/index.js';
import {FavoriteService} from './favorite-service.interface.js';

@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController..');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ExistingDocumentMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFromFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ExistingDocumentMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(
    {tokenPayload}: Request, res: Response
  ): Promise<void> {
    const offers = await this.favoriteService.findByUserId(tokenPayload.id);
    const responseData = fillDto(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async addToFavorites(
    {params, tokenPayload}: Request<offerIdType>, res: Response
  ): Promise<void> {
    await this.favoriteService.addToFavorites(tokenPayload.id, params.offerId);
    this.ok(res, {message: 'Offer added to favorites'});
  }

  public async removeFromFavorites(
    {params, tokenPayload}: Request<offerIdType>, res: Response
  ): Promise<void> {
    await this.favoriteService.removeFromFavorites(tokenPayload.id, params.offerId);
    this.ok(res, {message: 'Offer removed from favorites'});
  }
}
