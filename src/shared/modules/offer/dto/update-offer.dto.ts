import { City, OfferType } from '../../../../types/index.js';

export class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public postDate?: string;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: OfferType;
  public rooms?: number;
  public maxGuests?: number;
  public price?: number;
  public amenities?: string[];
  public authorId?: string;
  public commentsCount?: number;
  public coordinates?: {
    longitude: number;
    latitude: number;
  };
}
