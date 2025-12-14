import { DocumentType } from '@typegoose/typegoose';
import {CreateUserDTO} from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import {UpdateUserDTO} from './dto/update-user.dto.js';
import {LoginUserDTO} from './dto/login-user.dto.js';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  existsByEmail(email: string): Promise<boolean>;
  update(id: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null>;
  verifyUser(dto: LoginUserDTO, salt: string): Promise<DocumentType<UserEntity> | null>;
}
