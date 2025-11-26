import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { NextFunction, Request, Response } from 'express';
import { CreateUserRequestType } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDto } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequestType } from './login-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController..');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.check });
    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout });
  }

  public async create(
    { body }: CreateUserRequestType, res: Response, _next: NextFunction
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT, `User with email "${body.email}" already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDto(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequestType, _res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      const existUserError = new Error(`User with email ${body.email} not found`);
      this.error(_res, StatusCodes.UNAUTHORIZED, { error: existUserError });
      return this.logger.error(existUserError.message, existUserError);
    }

    return this.logger.error('Not implemented', new Error('Not implemented'));
  }

  public async check(
    { body }: LoginUserRequestType, res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      const existUserError = new Error(`User with email ${body.email} not found`);
      this.error(res, StatusCodes.UNAUTHORIZED, { error: existUserError });
      return this.logger.error(existUserError.message, existUserError);
    }

    this.ok(res, fillDto(UserRdo, existUser));
    return this.logger.error('Not implemented', new Error('Not implemented'));
  }

  public async logout(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    this.ok(res, { message: 'Logged out succesfully' });
  }
}
