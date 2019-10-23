import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { forOwn } from 'lodash';
import { LOAD_MARKETPLACE, CONNECT, DISCONNECT } from './constants';
import { storeMarketplaceData, loadMarketplace as loadMarketplaceAction } from './actions';

export function* loadMarketplace() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/marketplace-integration',
    params: { shop_id: shopId },
    method: 'GET',
  });

  yield put(storeMarketplaceData(res));
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
    data = { shopify_shop: shopifyShop };
  } else if (connectionName === 'easystore') {
    const { easystoreShop } = additionalParams;
    url = '/easystore/oauth';
    data = { easystore_shop: easystoreShop };
  } else if (connectionName === 'shopee') {
    url = '/shopee/oauth';
  } else if (connectionName === 'woocommerce') {
    const { woocommerceStoreUrl } = additionalParams;
    url = '/woocommerce/oauth';
    data = { woocommerce_store_url: woocommerceStoreUrl };
  }

  try {
    const res = yield call(request, {
      url,
      params: { shop_id: shopId },
      data,
      method: 'POST'
    });

    // do redirect
    window.location.href = res.url;
  } catch (err) {
    if (err.status_code === 422) {
      const errObj = {};
      forOwn(err.errors, ([value], key) => {
        errObj[key] = value;
      });
      if (connectionName === 'shopify') {
        onError(errObj.shopify_shop);
      } else if (connectionName === 'easystore') {
        onError(errObj.easystore_shop);
      } else if (connectionName === 'woocommerce') {
        onError(errObj.woocommerce_store_url);
      }
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
  } else if (connectionName === 'easystore') {
    url = 'easystore/oauth';
  } else if (connectionName === 'shopee') {
    url = 'shopee/oauth';
  } else if (connectionName === 'woocommerce') {
    url = 'woocommerce/oauth';
  }

  const res = yield call(request, {
    url,
    params: { shop_id: shopId },
    method: 'DELETE',
  });

  if (connectionName === 'shopee') {
    // do redirect
    window.location.href = res.url;
  } else {
    yield put(loadMarketplaceAction());
  }
}

export default function* () {
  yield takeLatest(LOAD_MARKETPLACE, loadMarketplace);
  yield takeLatest(CONNECT, connect);
  yield takeLatest(DISCONNECT, disconnect);
}
