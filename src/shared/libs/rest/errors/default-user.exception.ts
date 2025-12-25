import { HttpError } from './http-error.js';

export class DefaultUserException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
