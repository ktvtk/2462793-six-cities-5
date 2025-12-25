import { DefaultUserException } from './default-user.exception.js';
import {StatusCodes} from 'http-status-codes';

export class UserNotFoundException extends DefaultUserException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}
