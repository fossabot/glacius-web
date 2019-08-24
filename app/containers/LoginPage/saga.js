import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { loginUser } from 'components/RequiredAuth/actions';
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
    yield put(push(params && params.rtn ? params.rtn : '/portal'));
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
      setStatus({ password: err.msg });
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(ATTEMPT_LOGIN, attemptLogin);
}
