import { REGISTER } from './constants';

export function register(values, formActions) {
  return {
    type: REGISTER,
    values,
    formActions
  };
}
