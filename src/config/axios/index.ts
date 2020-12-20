import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { authTokenKey } from '../constants';
import { handleError } from './error-handler';

export const API_URL = process.env.REACT_APP_API_HOST;

declare module 'axios' {
  export interface AxiosRequestConfig {
    toApi?: boolean;
    cache?: boolean;
    ttl?: number;
    withReq?: boolean;
  }
}

const requestInterceptor = {
  onFulFilled: (_config: AxiosRequestConfig) => {
    const config = Object.assign(_config);
    const authToken = sessionStorage.getItem(authTokenKey);
    if (config.toApi) config.url = `${API_URL}${config.url}`;
    if (authToken) config.headers.Authorization = `apikey ${authToken}`;
    return config;
  },
  onRejected: (err: any) => {
    return Promise.reject(err);
  },
};

const responseInterceptor = {
  onFulFilled: (res: AxiosResponse) => {
    const { config: _config } = res;
    const config: AxiosRequestConfig = Object.assign(_config);
    if (config.withReq) return res;
    return res.data;
  },
  onRejected: (err: any) => {
    handleError({ err });
    return Promise.reject(err);
  },
};

axios.interceptors.request.use(requestInterceptor.onFulFilled, requestInterceptor.onRejected);
axios.interceptors.response.use(responseInterceptor.onFulFilled, responseInterceptor.onRejected);
