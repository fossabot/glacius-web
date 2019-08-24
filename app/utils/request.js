import axios from 'axios';
import { store } from 'configureStore';
import { logoutUser } from 'components/RequiredAuth/actions';

function processResponse(response) {
  return response.data;
}

function processError(error) {
  if (error.response) {
    if (error.response.status === 401) {
      if (store.getState().router.location.pathname !== '/login') {
        store.dispatch(logoutUser());
      }
    }
    throw error.response.data;
  }

  let newError;
  newError.status = 400;
  newError.msg = error.message;

  throw newError;
}

export default function request(options) {
  const opt = { ...options, baseURL: process.env.SERVER_BASE_URL };
  return axios(opt)
    .then(processResponse)
    .catch(processError);
}
