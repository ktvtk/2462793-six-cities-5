import {Request} from 'express';
import {LoginUserDTO} from './dto/login-user.dto';
import {RequestBody, RequestParams} from '../../libs/rest/index.js';

export type LoginUserRequestType = Request<RequestParams, RequestBody, LoginUserDTO>;
