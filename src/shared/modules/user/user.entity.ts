import {User, UserType} from '../../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {createSHA256} from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User{
  @prop({
    required: true,
    minlength: 1,
    maxlength: 15,
    trim: true
  })
  public name: string;

  @prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  })
  public email: string;

  @prop({required: false, default: ''})
  public avatar?: string;

  @prop({
    required: true,
    minlength: 6,
    select: false,
    default: '',
  })
  private password?: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType,
    default: UserType.ordinary,
  })
  public type!: UserType;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
