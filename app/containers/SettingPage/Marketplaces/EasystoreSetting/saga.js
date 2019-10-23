import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { LOAD_EASYSTORE_SETTING, UPDATE_EASYSTORE_SETTING } from './constants';
import { storeEasystoreSetting, loadEasystoreSetting as loadEasystoreSettingAction } from './actions';

export function* loadEasystoreSetting() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/easystore',
    params: { shop_id: shopId },
    method: 'GET',
  });

  yield put(storeEasystoreSetting(res));
}

export function* updateEasystoreSetting(action) {
  const { settingData } = action;

  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/setting/easystore',
    params: { shop_id: shopId },
    data: { data: settingData },
    method: 'PATCH',
  });

  yield put(loadEasystoreSettingAction());
}

export default function* () {
  yield takeLatest(LOAD_EASYSTORE_SETTING, loadEasystoreSetting);
  yield takeLatest(UPDATE_EASYSTORE_SETTING, updateEasystoreSetting);
}
