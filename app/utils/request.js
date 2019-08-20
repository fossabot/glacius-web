import axios from 'axios';
import { store } from 'configureStore';
import { logoutUser } from 'components/RequiredAuth/actions';

function processResponse(response) {
  return response.data;
}

function processError(error) {
  if (error.response) {
    if (error.response.status === 401) {
      if (store.getState().router.location.pathname === '/login') {
        store.dispatch(logoutUser(true));
      } else {
        store.dispatch(logoutUser());
      }
    }
    throw error.response.data;
  }

  throw error;
}

export default function request(options) {
  const opt = { ...options, baseURL: process.env.SERVER_BASE_URL };
  return axios(opt)
    .then(processResponse)
    .catch(processError);
}
