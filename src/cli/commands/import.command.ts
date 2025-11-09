import {TSVFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import {parseOffer} from '../../shared/helpers/parseOffer.js';
import {getErrorMessage} from '../../shared/helpers/common.js';
import {getMongoURI} from '../../shared/helpers/index.js';
import {ConsoleLogger, Logger} from '../../shared/libs/logger/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {DefaultUserService, UserModel, UserService} from '../../shared/modules/user/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './comand.constant.js';
import {Offer} from '../../types/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = parseOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      name: offer.author.name,
      email: offer.author.email,
      avatar: offer.author.avatar,
      password: DEFAULT_USER_PASSWORD,
      type: offer.author.type,
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      maxGuests: offer.maxGuests,
      price: offer.price,
      amenities: offer.goods,
      authorId: user.id,
      commentsCount: offer.commentsCount || 0,
      coordinates: offer.coordinates
    });
  }


  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
