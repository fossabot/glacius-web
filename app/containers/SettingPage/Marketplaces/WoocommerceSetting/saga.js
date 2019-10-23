import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { LOAD_WOOCOMMERCE_SETTING, UPDATE_WOOCOMMERCE_SETTING } from './constants';
import { storeWoocommerceSetting, loadWoocommerceSetting as loadWoocommerceSettingAction } from './actions';

export function* loadWoocommerceSetting() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/woocommerce',
    params: { shop_id: shopId },
    method: 'GET',
  });

  yield put(storeWoocommerceSetting(res));
}

export function* updateWoocommerceSetting(action) {
  const { settingData } = action;

  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/woocommerce',
    params: { shop_id: shopId },
    data: { data: settingData },
    method: 'PATCH',
  });

  yield put(loadWoocommerceSettingAction());
}

export default function* () {
  yield takeLatest(LOAD_WOOCOMMERCE_SETTING, loadWoocommerceSetting);
  yield takeLatest(UPDATE_WOOCOMMERCE_SETTING, updateWoocommerceSetting);
}
