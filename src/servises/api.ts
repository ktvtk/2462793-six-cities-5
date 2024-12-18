import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';
import {store} from '../store';
import {AuthorizationStatus} from '../const.ts';
import {setAuthorizationStatus} from '../store/user-data/user-data.ts';

const baseURL = 'https://14.design.htmlacademy.pro/six-cities';
const requestTimeout = 5000;

type ErrorMessageType = {
  errorType: string;
  message: string;
};

export const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: requestTimeout
  });

  api.interceptors.request.use(
    (config : InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers){
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessageType>) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(
          setAuthorizationStatus(AuthorizationStatus.Unauthorized),
        );
      }
      throw error;
    },
  );

  return api;
};

