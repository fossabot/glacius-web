import {
  call, put, select, takeLatest
} from 'redux-saga/effects';

import request from 'utils/request';
import {
  storeUserProfile, storeUserShop, reset as resetGlobalState, storeToken
} from 'containers/App/actions';
import { replace } from 'connected-react-router';
import { getAuthToken, removeAuthToken, saveAuthToken } from 'utils/localStorage';
import axios from 'axios';
import { makeSelectToken, makeSelectUserProfile, makeSelectLocation } from 'containers/App/selectors';
import { loadUserProfile as loadUserProfileAction, loadUserShop as loadUserShopAction, logoutUser as logoutUserAction } from './actions';
import {
  CHECK_AUTH, LOAD_USER_PROFILE, LOAD_USER_SHOP, LOGIN_USER, LOGOUT_USER,
} from './constants';

export function* loginUser(action) {
  saveAuthToken(action.token);
  yield put(storeToken(action.token));
}

export function* logoutUser() {
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

  yield put(replace(`/login${newPath ? `?rtn=${encodeURIComponent(newPath)}` : ''}`));
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
      yield put(loadUserShopAction());
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

export function* loadUserShop() {
  try {
    const res = yield call(request, {
      url: '/shop',
      method: 'get'
    });

    yield put(storeUserShop(res[0]));
  } catch (err) {
    yield put(storeUserShop(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(CHECK_AUTH, checkAuth);
  yield takeLatest(LOAD_USER_PROFILE, loadUserProfile);
  yield takeLatest(LOAD_USER_SHOP, loadUserShop);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
}
