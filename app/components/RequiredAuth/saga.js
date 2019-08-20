import {
  call, put, select, takeLatest
} from 'redux-saga/effects';

import request from 'utils/request';
import { storeUserProfile, reset as resetGlobalState, storeToken } from 'containers/App/actions';
import { push } from 'connected-react-router';
import { getAuthToken, removeAuthToken, saveAuthToken } from 'utils/localStorage';
import axios from 'axios';
import { makeSelectToken, makeSelectUserProfile, makeSelectLocation } from 'containers/App/selectors';
import { loadUserProfile as loadUserProfileAction, logoutUser as logoutUserAction } from './actions';
import {
  CHECK_AUTH, LOAD_USER_PROFILE, LOGIN_USER, LOGOUT_USER
} from './constants';

export function* loginUser(action) {
  saveAuthToken(action.token);
  yield put(storeToken(action.token));
}

export function* logoutUser(action) {
  yield put(resetGlobalState());
  removeAuthToken();
  delete axios.defaults.headers.common.Authorization;
  const currentLocation = yield select(makeSelectLocation());

  let newPath;
  if (currentLocation) {
    if (currentLocation.pathname) {
      newPath = currentLocation.pathname;
    }

    if (currentLocation.search) {
      newPath += currentLocation.search;
    }
  }

  yield put(push(`/login${!action.doNotRtn && newPath ? `?rtn=${encodeURIComponent(newPath)}` : ''}`));
}

export function* checkAuth() {
  const token = yield select(makeSelectToken());
  const userProfile = yield select(makeSelectUserProfile());

  if (!token || !userProfile) {
    const tokenFromLocalStorage = getAuthToken();
    if (tokenFromLocalStorage) {
      axios.defaults.headers.common.Authorization = `Bearer ${tokenFromLocalStorage}`;
      yield put(storeToken(tokenFromLocalStorage));
      yield put(loadUserProfileAction());
    } else {
      yield put(logoutUserAction());
    }
  }
}

export function* loadUserProfile() {
  try {
    const res = yield call(request, {
      url: '/user/me',
      method: 'GET'
    });

    yield put(storeUserProfile(res));
  } catch (err) {
    yield put(logoutUserAction());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(CHECK_AUTH, checkAuth);
  yield takeLatest(LOAD_USER_PROFILE, loadUserProfile);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
}
