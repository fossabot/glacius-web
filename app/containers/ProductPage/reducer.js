import { STORE_PRODUCT_DATA } from './constants';

export const initialState = {
  productData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_PRODUCT_DATA:
      return { ...state, productData: action.productData };

    default:
      return state;
  }
}

export default appReducer;
