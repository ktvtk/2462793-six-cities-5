import {Request} from 'express';
import {RequestBody, RequestParams} from '../../libs/rest';
import {CreateUserDTO} from './dto/create-user.dto';

export type CreateUserRequestType = Request<RequestParams, RequestBody, CreateUserDTO>;
