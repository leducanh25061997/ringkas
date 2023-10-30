import path from 'app/routes/path';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';

import { LocalStorageService } from '../';

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean; // is true if you want to self handle access denied exception
  }
}

const baseURL = process.env.REACT_APP_API_URL;

export const createService = (
  baseURL?: string,
  contentType: string = 'application/json',
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

export const downloadFileService = (
  baseURL?: string,
  contentType: string = 'application/json',
): AxiosInstance => {
  const config: AxiosRequestConfig = baseConfig(baseURL, contentType);
  config.responseType = 'blob';
  return interceptAuth(config);
};

const baseConfig = (
  baseURL?: string,
  contentType: string = 'application/json',
) => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': contentType,
    },
  };
};

const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);
  instance.interceptors.request.use(cf => {
    const token = LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);
    if (token) {
      cf.headers['Authorization'] = 'Bearer ' + token;
    }
    return cf;
  });
  instance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        if (error.config.url !== 'console/my-account') {
          window.location.href = path.login;
        }
        LocalStorageService.removeAllItem();
      }
      // Do something with response error
      return Promise.reject(error);
    },
  );
  return instance;
};

export const createServiceNoToken = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(config => {
    return config;
  });
  return instance;
};

export const axiosClient = createService(baseURL);
