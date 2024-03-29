import {
  STORE_TOKEN, STORE_USER_PROFILE, RESET, SET_MODULE, STORE_USER_SHOP,
} from './constants';

export const initialState = {
  token: false,
  userProfile: false,
  userShop: false,
  currentModule: ''
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return { ...state, token: action.token };

    case STORE_USER_PROFILE:
      return { ...state, userProfile: action.userProfile };

    case STORE_USER_SHOP:
      return { ...state, userShop: action.shop };

    case RESET:
      return { ...state, ...initialState };

    case SET_MODULE:
      return { ...state, currentModule: action.module };

    default:
      return state;
  }
}

export default appReducer;
