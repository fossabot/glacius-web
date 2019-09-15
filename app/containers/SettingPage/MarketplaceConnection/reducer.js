import { STORE_CONNECTION_DATA } from './constants';

export const initialState = {
  connectionData: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_CONNECTION_DATA:
      return { ...state, connectionData: action.connectionData };

    default:
      return state;
  }
}

export default appReducer;
