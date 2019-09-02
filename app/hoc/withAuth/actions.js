import {
  CHECK_AUTH,
  LOAD_USER_PROFILE,
  LOAD_USER_SHOP,
  LOGIN_USER,
  LOGOUT_USER
} from './constants';

export function checkAuth() {
  return {
    type: CHECK_AUTH
  };
}

export function loadUserProfile() {
  return {
    type: LOAD_USER_PROFILE
  };
}

export function loadUserShop() {
  return {
    type: LOAD_USER_SHOP
  };
}

export function loginUser(token) {
  return {
    type: LOGIN_USER,
    token
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
