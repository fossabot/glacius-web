import {
  LOAD_ORDER_DATA, STORE_ORDER_DATA
} from './constants';

export function loadOrderData() {
  return {
    type: LOAD_ORDER_DATA
  };
}

export function storeOrderData(orderData) {
  return {
    type: STORE_ORDER_DATA,
    orderData
  };
}
