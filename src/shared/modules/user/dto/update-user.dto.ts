import {UserType} from '../../../../types/index.js';

export class UpdateUserDTO {
  public name?: string;
  public email?: string;
  public avatar?: string;
  public password?: string;
  public type?: UserType;
}
