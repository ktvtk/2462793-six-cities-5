import {injectable, inject} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/index.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {CreateCommentDTO} from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment created: ${dto.date}`);
    return result as unknown as DocumentType<CommentEntity>;
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? 50;
    const sortType = -1;
    const findQuery = this.commentModel
      .find({ offerId })
      .limit(limit)
      .sort({ createdAt: sortType })
      .exec();
    return findQuery as unknown as DocumentType<CommentEntity>[];
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();
    return result.deletedCount;
  }
}
