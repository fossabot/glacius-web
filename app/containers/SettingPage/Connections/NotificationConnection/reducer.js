import { STORE_NOTIFICATION_DATA } from './constants';

export const initialState = {
  notificationData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_NOTIFICATION_DATA:
      return { ...state, notificationData: action.notificationData };

    default:
      return state;
  }
}

export default appReducer;
