import {
  LOAD_CUSTOMER_DATA, STORE_CUSTOMER_DATA
} from './constants';

export function loadCustomerData() {
  return {
    type: LOAD_CUSTOMER_DATA
  };
}

export function storeCustomerData(customerData) {
  return {
    type: STORE_CUSTOMER_DATA,
    customerData
  };
}
