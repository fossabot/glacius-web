import {
  LOAD_PRODUCT_DATA, STORE_PRODUCT_DATA, CREATE_PRODUCT, UPDATE_PRODUCT
} from './constants';

export function loadProductData() {
  return {
    type: LOAD_PRODUCT_DATA
  };
}

export function storeProductData(productData) {
  return {
    type: STORE_PRODUCT_DATA,
    productData
  };
}

export function createProduct(values, formActions) {
  return {
    type: CREATE_PRODUCT,
    values,
    formActions
  };
}

export function updateProduct(values, formActions, productId) {
  return {
    type: UPDATE_PRODUCT,
    values,
    formActions,
    productId
  };
}
