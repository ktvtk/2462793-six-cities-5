import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {City} from "../../../types/index.js";
import {OfferType} from "../../../types/index.js";
import {Goods} from "../../../types/index.js";
import {OfferInput} from "../../../types/index.js";

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): OfferInput[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewImage, images, isPremium, isFavorite, rating, type, rooms, guests, price, goods, authorEmail, latitude, longitude]) => ({
        title,
        description,
        postDate,
        city: City[city as keyof typeof City],
        previewImage,
        images: images.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseFloat(rating),
        type: OfferType[type as keyof typeof OfferType],
        rooms: parseInt(rooms, 10),
        guests: parseInt(guests, 10),
        price: parseInt(price, 10),
        goods: goods.split(';').map((goodValues) => Goods[goodValues as keyof typeof Goods]),
        authorEmail: authorEmail,
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      }));
  }
}
