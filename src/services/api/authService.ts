import { SignUpHeadquarterData } from './../../app/pages/Register/slice/types';
/* eslint-disable import/no-anonymous-default-export */
import { AuthResponse, AuthParams, UserInformation } from 'types';
import queryString from 'query-string';
import { RegistrationForm, UpdatePasswordForm } from 'types/Auth';

import { LocalStorageService } from '..';

import { createServiceNoToken, createService } from './axios';

const TokenUrl = process.env.REACT_APP_KEYCLOAK_TOKEN_URL;
const LogoutUrl = process.env.REACT_APP_KEYCLOAK_LOGOUT_URL;
const GRANT_TYPE = 'password';
const TYPE = 'CODE';
const LINK = 'LINK_RESET_PASSWORD';
const baseURL = process.env.REACT_APP_API_URL;

const instance = createServiceNoToken(TokenUrl);
const customInstance = createService(baseURL);
const instanceLogout = createServiceNoToken(LogoutUrl);

const login = async (params: AuthParams): Promise<AuthResponse> => {
  const request = {
    ...params,
    grant_type: GRANT_TYPE,
    type: TYPE,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const changePassword = async (params: AuthParams): Promise<AuthResponse> => {
  const request = {
    ...params,
    grant_type: GRANT_TYPE,
    type: LINK,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const CheckOTP = async (params: AuthParams): Promise<AuthResponse> => {
  const request = {
    ...params,
    grant_type: GRANT_TYPE,
    type: TYPE,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const refetchAccessToken = async (
  refreshToken: string,
): Promise<AuthResponse> => {
  const request = {
    grant_type: 'refresh_token',
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    refresh_token: refreshToken,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const logout = async (): Promise<any> => {
  const refresh_token = LocalStorageService.get(
    LocalStorageService.REFRESH_TOKEN,
  );
  const access_token = LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);
  const request = {
    refresh_token,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  await instanceLogout.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
  });
};

const signUpDeveloper = async (
  params: RegistrationForm,
): Promise<RegistrationForm> => {
  const response = await customInstance.post(
    '/console/developer-account/registration',
    params,
  );
  return response.data;
};

const signUpBank = async (data: any): Promise<any> => {
  const response = await customInstance.post(
    '/console/bank-account/registration',
    data,
  );
  return response.data;
};

const getProfile = async (): Promise<UserInformation> => {
  const response = await customInstance.get('console/my-account');
  return response.data;
};

const updatePassword = async (
  data: UpdatePasswordForm,
): Promise<UpdatePasswordForm> => {
  const response = await customInstance.put(
    '/console/my-account/password',
    data,
  );
  return response.data;
};

const getToken = async (params: AuthParams): Promise<AuthResponse> => {
  const request = {
    ...params,
    grant_type: GRANT_TYPE,
    type: LINK,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  };
  const response = await instance.post('', queryString.stringify(request), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export default {
  login,
  refetchAccessToken,
  logout,
  getProfile,
  CheckOTP,
  signUpDeveloper,
  signUpBank,
  changePassword,
  updatePassword,
  getToken,
};
