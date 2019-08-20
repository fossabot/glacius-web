import {
  ATTEMPT_LOGIN, LOGIN_ERROR, RESET
} from './constants';

export function attemptLogin(email, password) {
  return {
    type: ATTEMPT_LOGIN,
    email,
    password
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function reset() {
  return {
    type: RESET
  };
}
