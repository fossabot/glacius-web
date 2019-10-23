import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { storeCustomerData } from './actions';
import { LOAD_CUSTOMER_DATA } from './constants';

export function* loadCustomerData() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/customer',
    params: { shop_id: shopId },
    method: 'GET'
  });

  yield put(storeCustomerData(res));
}

export default function* () {
  yield takeLatest(LOAD_CUSTOMER_DATA, loadCustomerData);
}
