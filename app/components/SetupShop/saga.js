import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { forOwn, identity, pickBy } from 'lodash';
import { loadUserShop } from 'hoc/withAuth/actions';
import { CREATE_SHOP } from './constants';

export function* createShop(action) {
  const { values } = action;

  try {
    const res = yield call(request, {
      url: '/shop',
      data: pickBy(values, identity),
      method: 'POST'
    });

    yield put(loadUserShop());
  } catch (err) {
    const { setStatus, setSubmitting } = action.formActions;
    setSubmitting(false);

    if (err.status === 422) {
      const errObj = {};
      forOwn(err.msg, (value, key) => {
        errObj[key] = value.msg;
      });
      setStatus(errObj);
    } else {
      setStatus({ shopDesc: err.msg });
    }
  }
}

export default function* () {
  yield takeLatest(CREATE_SHOP, createShop);
}
