import {isString, isObject} from 'lodash';
import Storage from './storage';

const accessToken = '_accessToken';
const profileKEY = '_profile';

export const persistAccessToken = accessTokens => {
  Storage.setItem(accessToken, accessTokens);
};

export const persistProfile = profile => {
  Storage.setItem(profileKEY, profile);
};

export const rehydrateAccessToken = async () => {
  const asyncAccessToken = await Storage.getItem(accessToken);
  if (asyncAccessToken && isString(asyncAccessToken)) {
    return asyncAccessToken;
  }
  return null;
};
export const rehydrateProfile = async () => {
  const profile = await Storage.getItem(profileKEY);
  if (profile && isObject(profile)) {
    return profile;
  }
  return {};
};

export const clearAccessToken = async () => {
  await Storage.removeItem(accessToken);
};

export const clearProfile = async () => {
  await Storage.removeItem(profileKEY);
};
