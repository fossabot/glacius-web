import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { forOwn, identity, pickBy } from 'lodash';
import { push } from 'connected-react-router';
import { CHANGE_PASSWORD } from './constants';

export function* changePassword(action) {
  const { values } = action;

  try {
    const res = yield call(request, {
      url: '/user/password',
      data: pickBy(values, identity),
      method: 'PATCH',
    });

    yield put(push('/portal/account'));
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
      setStatus({ generalError: err.msg });
    }
  }
}

export default function* () {
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}
