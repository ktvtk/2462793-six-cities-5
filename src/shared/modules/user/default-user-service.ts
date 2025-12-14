import {UserEntity} from './user.entity.js';
import {CreateUserDTO} from './dto/create-user.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../../types/index.js';
import { UserService } from './index.js';
import {inject, injectable} from 'inversify';
import { Logger } from '../../libs/logger/pino.logger.js';
import {UpdateUserDTO} from './dto/update-user.dto.js';
import {LoginUserDTO} from './dto/login-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }
    return this.create(dto, salt);
  }

  public async existsByEmail(email: string): Promise<boolean> {
    return (await this.userModel
      .exists({_email: email})) !== null;
  }

  public async update(id: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(id, dto, {new: true})
      .exec();
  }

  public async verifyUser(dto: LoginUserDTO, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);
    if (!user) {
      return null;
    }
    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }
    return null;
  }
}
