import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_NOTIFICATION, CONNECT, DISCONNECT } from './constants';
import { storeNotificationData, loadNotification as loadNotificationAction } from './actions';

export function* loadNotification() {
  const res = yield call(request, {
    url: '/notification',
    method: 'GET',
  });

  yield put(storeNotificationData(res));
}

export function* connect(action) {
  const { connectionName } = action;

  let url = '/notification';
  const data = {};
  if (connectionName === 'telegram') {
    url += '/telegram';
  }

  const res = yield call(request, {
    url,
    data,
    method: 'POST'
  });

  // open in new tab
  window.open(res.url, '_blank');
}

export function* disconnect(action) {
  const { connectionName } = action;

  let url = '/notification';
  if (connectionName === 'telegram') {
    url += '/telegram';
  }

  yield call(request, {
    url,
    method: 'DELETE',
  });

  yield put(loadNotificationAction());
}

export default function* () {
  yield takeLatest(LOAD_NOTIFICATION, loadNotification);
  yield takeLatest(CONNECT, connect);
  yield takeLatest(DISCONNECT, disconnect);
}
