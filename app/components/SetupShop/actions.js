import { CREATE_SHOP } from './constants';

export function createShop(values, formActions) {
  return {
    type: CREATE_SHOP,
    values,
    formActions
  };
}
