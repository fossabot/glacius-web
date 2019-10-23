import { STORE_EASYSTORE_SETTING } from './constants';

export const initialState = {
  settingData: {}
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_EASYSTORE_SETTING:
      return { ...state, settingData: action.settingData };

    default:
      return state;
  }
}

export default appReducer;
