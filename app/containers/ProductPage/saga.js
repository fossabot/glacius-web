import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUserShop } from 'containers/App/selectors';
import { forOwn, identity, pickBy } from 'lodash';
import { push } from 'connected-react-router';
import { storeProductData } from './actions';
import { LOAD_PRODUCT_DATA, CREATE_PRODUCT, UPDATE_PRODUCT } from './constants';

function handleErr(err, action) {
  const { setStatus, setSubmitting } = action.formActions;
  setSubmitting(false);

  if (err.status_code === 422) {
    const errObj = {};
    forOwn(err.errors, ([value], key) => {
      if (key.includes('.')) {
        const splittedKey = key.split('.');
        errObj[splittedKey[splittedKey.length - 1]] = value;
      } else {
        errObj[key] = value;
      }
    });
    setStatus(errObj);
  } else {
    setStatus({ generalError: err.message });
  }
}

export function* loadProductData() {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;

  const res = yield call(request, {
    url: '/product',
    params: { shop_id: shopId },
    method: 'GET'
  });

  yield put(storeProductData(res));
}

export function* createProduct(action) {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;
  const { values } = action;

  try {
    const res = yield call(request, {
      url: '/product',
      params: { shop_id: shopId },
      data: pickBy(values, identity),
      method: 'POST'
    });

    yield put(push('/portal/products'));
  } catch (err) {
    handleErr(err, action);
  }
}

export function* updateProduct(action) {
  const userShop = yield select(makeSelectUserShop());
  const { id: shopId } = userShop;
  const { values, productId } = action;

  try {
    const res = yield call(request, {
      url: `/product/${productId}`,
      params: { shop_id: shopId },
      data: pickBy(values, identity),
      method: 'PATCH'
    });

    yield put(push('/portal/products'));
  } catch (err) {
    handleErr(err, action);
  }
}

export default function* () {
  yield takeLatest(LOAD_PRODUCT_DATA, loadProductData);
  yield takeLatest(CREATE_PRODUCT, createProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
}
