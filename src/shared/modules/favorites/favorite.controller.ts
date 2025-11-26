import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component, offerIdType} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from '../offer/index.js';
import {Request, Response} from 'express';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from '../offer/rdo/offer.rdo.js';
import {StatusCodes} from 'http-status-codes';

@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController..');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites as unknown as (req: Request, res: Response) => void
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFromFavorites as unknown as (req: Request, res: Response) => void
    });
  }

  public async index(
    _req: Request, res: Response
  ): Promise<void> {
    const offers = await this.findFavorites();
    const responseData = fillDto(OfferRdo, offers);
    this.ok(res, responseData);
  }

  private async findFavorites() {
    return [
      {
        id: '1784f737j',
        title: 'sometitle',
      },
      {
        id: '383gt929po',
        title: 'sometitle',
      }
    ];
  }

  public async addToFavorites(
    { params }: Request<offerIdType>,
    _res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'FavoritesController');
    }

    throw new Error('Not implemented');
  }

  public async removeFromFavorites(
    { params }: Request<offerIdType>,
    _res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'FavoritesController');
    }
    throw new Error('Not implemented');
  }
}
