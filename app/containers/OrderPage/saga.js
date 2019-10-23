import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { storeOrderData } from './actions';
import { LOAD_ORDER_DATA } from './constants';

export function* loadOrderData() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/order',
    params: { shop_id: shopId },
    method: 'GET'
  });

  yield put(storeOrderData(res));
}

export default function* () {
  yield takeLatest(LOAD_ORDER_DATA, loadOrderData);
}
