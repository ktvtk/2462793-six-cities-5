import {Command} from './command.interface';
import got from 'got';
import {DataGenerator} from '../../shared/libs/data-generator/data-generator.js';
import {Offer, MockServerResponse} from '../../types/index.js';
import {createWriteStream} from 'node:fs';
import {Transform} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import chalk from 'chalk';


export class GenerateCommand implements Command {
  private readonly dataGenerator = new DataGenerator();

  public getName(): string {
    return '--generate';
  }

  private async load(url: string): Promise<MockServerResponse> {
    try {
      const response = await got.get(`${url}/offers`);
      const offers = JSON.parse(response.body) as Offer[];
      return { offers };
    } catch {
      throw new Error(`Cannot load data from ${url}`);
    }
  }

  private async write(mockData: MockServerResponse, count: number, filepath: string): Promise<void> {
    const writeStream = createWriteStream(filepath);

    const header = 'title\tdescription\tdate\tcity\tpreviewImage\timages\tisPremium\tisFavorite\trating\thousingType\trooms\tguests\tprice\tcomforts\tauthorName\tauthorEmail\tauthorAvatar\tpassword\tuserType\tlatitude\tlongitude\n';
    writeStream.write(header);

    const transformStream = new Transform({
      objectMode: true,
      transform: (chunk: Offer, _encoding, callback) => {
        const line = `${this.formatOfferAsTSV(chunk) }\n`;
        callback(null, line);
      }
    });

    for (let i = 0; i < count; i++) {
      const mockOffer = this.dataGenerator.getRandomElement(mockData.offers);
      const authorName = `User${this.dataGenerator.generateRandomNumber(1, 100)}`;
      const authorEmail = `user${this.dataGenerator.generateRandomNumber(1, 100)}@example.com`;
      const authorAvatar = `/img/user-avatar${this.dataGenerator.generateRandomNumber(1, 10)}.png`;

      const generatedOffer = this.dataGenerator.generateOffer(mockOffer, authorName, authorEmail, authorAvatar, password, userType);

      transformStream.write(generatedOffer);
    }

    transformStream.end();

    await pipeline(transformStream, writeStream);
  }

  private formatOfferAsTSV(offer: Offer): string {
    return [
      offer.title,
      offer.description,
      offer.postDate,
      offer.city,
      offer.previewImage,
      offer.images,
      offer.isPremium,
      offer.isFavorite,
      offer.rating,
      offer.type,
      offer.rooms,
      offer.guests,
      offer.price,
      offer.goods,
      offer.authorName,
      offer.authorEmail,
      offer.authorAvatar,
      offer.coordinates
    ].join('\t');
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;

    if (!count || !filepath || !url) {
      console.error(chalk.red('Invalid command. Usage: --generate <n> <filepath> <url>'));
      return;
    }

    const offerCount = parseInt(count, 10);
    if (isNaN(offerCount) || offerCount <= 0) {
      console.error(chalk.red('Count must be a positive number'));
      return;
    }

    try {
      console.log(chalk.blue('Fetching mock data from server...'));
      const mockData = await this.load(url);

      console.log(chalk.blue(`Generating ${offerCount} offers...`));
      await this.write(mockData, offerCount, filepath);

      console.log(chalk.green(`Successfully generated ${offerCount} offers to ${filepath}`));
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`Error generating offers: ${error.message}`));
      } else {
        console.error(chalk.red('Unknown error occurred'));
      }
    }
  }
}
