import { STORE_CUSTOMER_DATA } from './constants';

export const initialState = {
  customerData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_CUSTOMER_DATA:
      return { ...state, customerData: action.customerData };

    default:
      return state;
  }
}

export default appReducer;
