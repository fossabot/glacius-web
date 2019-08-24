import { ATTEMPT_LOGIN } from './constants';

export function attemptLogin(values, formActions) {
  return {
    type: ATTEMPT_LOGIN,
    values,
    formActions
  };
}
