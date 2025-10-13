import {
  City,
  OfferType,
  Goods,
  MockOfferData
} from '../../../types/index.js';

export class DataGenerator {
  private readonly cities = Object.values(City);
  private readonly offerTypes = Object.values(OfferType);
  private readonly goods = Object.values(Goods);

  public generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public generateRandomFloat(min: number, max: number, decimals = 1): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }

  public getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  public generateRandomDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString();
  }

  public generateRandomGoods(): Goods[] {
    const count = this.generateRandomNumber(1, this.goods.length);
    const shuffled = [...this.goods].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private getCityCoordinates(city: string): { latitude: number; longitude: number } {
    const coordinates: Record<string, { latitude: number; longitude: number }> = {
      [City.Paris]: { latitude: 48.85661, longitude: 2.351499 },
      [City.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
      [City.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
      [City.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
      [City.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
      [City.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 }
    };

    return coordinates[city];
  }

  public generateOffer(mockData: MockOfferData, authorName: string, authorEmail: string, authorAvatar: string, id: string, commentsCount: number): string {
    const title= this.getRandomElement(mockData.titles);
    const description= this.getRandomElement(mockData.descriptions);
    const postDate = this.generateRandomDate();
    const previewImage = this.getRandomElement(mockData.previewImages);
    const goods = this.generateRandomGoods();
    const city = this.getRandomElement(this.cities);
    const type = this.getRandomElement(this.offerTypes);
    const rooms = this.generateRandomNumber(1, 8);
    const guests = this.generateRandomNumber(1, 10);
    const price = this.generateRandomNumber(100, 100000);
    const rating = this.generateRandomFloat(1, 5);
    const isPremium = Math.random() < 0.3;
    const isFavorite = Math.random() < 0.2;
    const imagesString = this.getRandomElement(mockData.images);
    const images = imagesString.split(';').slice(0, 6);

    const cityCoordinates = this.getCityCoordinates(city);

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
      authorName,
      authorEmail,
      authorAvatar,
      `${cityCoordinates.latitude},${cityCoordinates.longitude}`,
      id,
      commentsCount
    ].join('\t');
  }
}

