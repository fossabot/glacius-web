import {
  STORE_TOKEN,
  STORE_USER_PROFILE,
  STORE_USER_SHOP,
  RESET,
  SET_MODULE
} from './constants';

export function storeToken(token) {
  return {
    type: STORE_TOKEN,
    token
  };
}

export function storeUserProfile(userProfile) {
  return {
    type: STORE_USER_PROFILE,
    userProfile
  };
}

export function storeUserShop(shop) {
  return {
    type: STORE_USER_SHOP,
    shop
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function setModule(module) {
  return {
    type: SET_MODULE,
    module
  };
}
