import { STORE_MARKETPLACE_DATA } from './constants';

export const initialState = {
  marketplaceData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_MARKETPLACE_DATA:
      return { ...state, marketplaceData: action.marketplaceData };

    default:
      return state;
  }
}

export default appReducer;
