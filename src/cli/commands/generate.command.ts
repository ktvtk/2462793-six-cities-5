import {Command} from './command.interface';
import {DataGenerator} from '../../shared/libs/data-generator/data-generator.js';
import {MockOfferData} from '../../types/index.js';
import {createWriteStream} from 'node:fs';
import {Transform} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import chalk from 'chalk';
import axios from 'axios';


export class GenerateCommand implements Command {
  private readonly dataGenerator = new DataGenerator();

  public getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      return (await axios.get(url)).data;
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(mockData: MockOfferData, count: number, filepath: string): Promise<void> {
    const writeStream = createWriteStream(filepath);

    const transformStream = new Transform({
      objectMode: true,
      transform: (chunk: string, _encoding, callback) => {
        callback(null, `${chunk}\n`);
      }
    });

    for (let i = 0; i < count; i++) {
      const authorName = `User${this.dataGenerator.generateRandomNumber(1, 100)}`;
      const authorEmail = `user${this.dataGenerator.generateRandomNumber(1, 100)}@example.com`;
      const authorAvatar = `/img/user-avatar${this.dataGenerator.generateRandomNumber(1, 10)}.png`;
      const id = `${this.dataGenerator.generateRandomNumber(1, 200)}`;
      const commentCount = this.dataGenerator.generateRandomNumber(0, 10);

      const generatedOffer = this.dataGenerator.generateOffer(mockData, authorName, authorEmail, authorAvatar, id, commentCount);
      console.log(generatedOffer);
      transformStream.write(generatedOffer);
    }

    transformStream.end();

    await pipeline(transformStream, writeStream);
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
