import {
  LOGIN_ERROR, RESET
} from './constants';

// The initial state of the App
const initialState = {
  error: false
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, error: action.error };
    case RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default loginReducer;
