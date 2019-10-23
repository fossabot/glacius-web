import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { replace } from 'connected-react-router';
import { loginUser } from 'hoc/withAuth/actions';
import { makeSelectLocationQueryString } from 'containers/App/selectors';
import { forOwn } from 'lodash';
import { ATTEMPT_LOGIN } from './constants';

export function* attemptLogin(action) {
  const { email, password } = action.values;

  try {
    const res = yield call(request, {
      url: '/user/login',
      method: 'POST',
      data: { email, password }
    });

    yield put(loginUser(res.token));

    const params = yield select(makeSelectLocationQueryString());
    yield put(replace(params && params.rtn ? params.rtn : '/portal'));
  } catch (err) {
    const { setStatus, setSubmitting } = action.formActions;
    setSubmitting(false);

    if (err.status_code === 422) {
      const errObj = {};
      forOwn(err.errors, ([value], key) => {
        errObj[key] = value;
      });
      setStatus(errObj);
    } else {
      setStatus({ password: err.message });
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(ATTEMPT_LOGIN, attemptLogin);
}
