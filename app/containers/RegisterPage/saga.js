import {
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { replace } from 'connected-react-router';
import { forOwn, identity, pickBy } from 'lodash';
import { REGISTER } from './constants';

export function* register(action) {
  const { values } = action;

  try {
    const res = yield call(request, {
      url: '/user/register',
      data: pickBy(values, identity),
      method: 'POST',
    });

    yield put(replace('/login'));
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(REGISTER, register);
}
