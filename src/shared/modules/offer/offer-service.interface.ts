import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> ;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(id: string): Promise<boolean>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
