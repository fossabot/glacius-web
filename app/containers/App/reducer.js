import {
  STORE_TOKEN,
  STORE_USER_PROFILE,
  RESET,
  SET_MODULE,
  STORE_USER_SHOP,
  SET_IS_EMAIL_VERIFIED
} from './constants';

export const initialState = {
  token: false,
  userProfile: false,
  userShop: false,
  isEmailVerified: true,
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

    case SET_IS_EMAIL_VERIFIED:
      return { ...state, isEmailVerified: action.isEmailVerified };

    case SET_MODULE:
      return { ...state, currentModule: action.module };

    default:
      return state;
  }
}

export default appReducer;
