import { StatusCodes } from 'http-status-codes';
import {DefaultUserException} from './default-user.exception.js';

export class UserPasswordIncorrectException extends DefaultUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect password');
  }
}
