import { STORE_ORDER_DATA } from './constants';

export const initialState = {
  orderData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_ORDER_DATA:
      return { ...state, orderData: action.orderData };

    default:
      return state;
  }
}

export default appReducer;
