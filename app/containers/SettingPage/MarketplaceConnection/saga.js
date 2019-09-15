import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { forOwn } from 'lodash';
import { LOAD_CONNECTION, CONNECT, DISCONNECT } from './constants';
import { storeConnectionData, loadConnection as loadConnectionAction } from './actions';

export function* loadConnection() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/marketplace-integration',
    params: { shopId },
    method: 'GET',
  });

  yield put(storeConnectionData(res));
}

export function* connect(action) {
  const { connectionName, additionalParams, onError } = action;

  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  let url = '';
  let data = {};
  if (connectionName === 'shopify') {
    const { shopifyShop } = additionalParams;
    url = '/shopify/oauth';
    data = { shopifyShop };
  } else if (connectionName === 'shopee') {
    url = '/shopee/oauth';
  }

  try {
    const res = yield call(request, {
      url,
      params: { shopId },
      data,
      method: 'POST'
    });

    // do redirect
    window.location.href = res.url;
  } catch (err) {
    if (err.status === 422) {
      const errObj = {};
      forOwn(err.msg, (value, key) => {
        errObj[key] = value.msg;
      });
      onError(errObj.shopifyShop);
    }
  }
}

export function* disconnect(action) {
  const { connectionName } = action;

  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  let url = '';
  if (connectionName === 'shopify') {
    url = 'shopify/oauth';
  } else if (connectionName === 'shopee') {
    url = 'shopee/oauth';
  }

  const res = yield call(request, {
    url,
    params: { shopId },
    method: 'DELETE',
  });

  if (connectionName === 'shopee') {
    // do redirect
    window.location.href = res.url;
  } else {
    yield put(loadConnectionAction());
  }
}

export default function* () {
  yield takeLatest(LOAD_CONNECTION, loadConnection);
  yield takeLatest(CONNECT, connect);
  yield takeLatest(DISCONNECT, disconnect);
}
