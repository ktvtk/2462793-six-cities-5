import {UserType} from '../../../../types/index.js';

export class CreateUserDTO {
  public name: string;
  public email: string;
  public avatar?: string | null;
  public password: string;
  public type: UserType;
}
