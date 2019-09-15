import { CHANGE_PASSWORD } from './constants';

export function changePassword(values, formActions) {
  return {
    type: CHANGE_PASSWORD,
    values,
    formActions
  };
}
