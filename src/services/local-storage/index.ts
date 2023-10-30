/* eslint-disable import/no-anonymous-default-export */
const PREFIX = '';

function set<T = object>(key: string, value: T): void {
  if (!localStorage) {
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(PREFIX + key, serializedValue);
  } catch (error) {
    throw new Error('store serialization failed');
  }
}

function get<T = object>(key: string): T | undefined {
  if (!localStorage) {
    return;
  }

  try {
    const serializedValue = localStorage.getItem(PREFIX + key);
    if (!serializedValue) {
      return;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    return;
  }
}

function removeItem(key: string) {
  if (!localStorage) {
    return;
  }
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (error) {
    return;
  }
}

function removeAllItem() {
  if (!localStorage) {
    return;
  }
  try {
    localStorage.clear();
  } catch (error) {
    return;
  }
}

export const OAUTH_TOKEN = 'rg_access_token';
export const REFRESH_TOKEN = 'rg_Refresh_token';
export const REGISTRATION_REQUEST = 'rk_registration_request';
export const ACTIVE_STEP = 'rk_active_step';
export const IMAGES = 'rk_images';
export const ACTIVE_TAB = 'rk_active_tab';

export default {
  get,
  set,
  removeItem,
  removeAllItem,
  OAUTH_TOKEN,
  REFRESH_TOKEN,
  REGISTRATION_REQUEST,
  ACTIVE_STEP,
  ACTIVE_TAB,
  IMAGES,
};
