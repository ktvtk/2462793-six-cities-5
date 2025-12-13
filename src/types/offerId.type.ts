import { ParamsDictionary } from 'express-serve-static-core';

export type offerIdType = {
  offerId: string;
} | ParamsDictionary;
