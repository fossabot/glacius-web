import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { LOAD_SHOPIFY_SETTING, UPDATE_SHOPIFY_SETTING } from './constants';
import { storeShopifySetting, loadShopifySetting as loadShopifySettingAction } from './actions';


export function* loadShopifySetting() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/shopify',
    params: { shop_id: shopId },
    method: 'GET',
  });

  yield put(storeShopifySetting(res));
}

export function* updateShopifySetting(action) {
  const { settingData } = action;

  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/shopify',
    params: { shop_id: shopId },
    data: { data: settingData },
    method: 'PATCH',
  });

  yield put(loadShopifySettingAction());
}

export default function* () {
  yield takeLatest(LOAD_SHOPIFY_SETTING, loadShopifySetting);
  yield takeLatest(UPDATE_SHOPIFY_SETTING, updateShopifySetting);
}
