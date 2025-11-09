import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import {CommentModel} from '../comment/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('author')
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate('author')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('author')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, { $inc: { commentsCount: 1 } }, { new: true })
      .exec() as DocumentType<OfferEntity> | null;
  }

  public async updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const comments = await CommentModel.find({ offerId }) ;
    if (comments.length === 0) {
      return await this.offerModel
        .findByIdAndUpdate(offerId, { rating: 0 }, { new: true })
        .exec() as DocumentType<OfferEntity> | null;
    }

    let sumRating = 0;
    for (const comment of comments) {
      sumRating += comment.rating;
    }
    const newRating = sumRating / comments.length;

    return await this.offerModel
      .findByIdAndUpdate(offerId, { rating: newRating }, { new: true })
      .exec() as DocumentType<OfferEntity> | null;
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: id })) !== null;
  }
}
