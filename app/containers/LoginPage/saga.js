import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { loginUser } from 'components/RequiredAuth/actions';
import { makeSelectLocationQueryString } from 'containers/App/selectors';
import { ATTEMPT_LOGIN } from './constants';
import { loginError } from './actions';

export function* attemptLogin(action) {
  const { email, password } = action;

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
    yield put(loginError(err.msg));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(ATTEMPT_LOGIN, attemptLogin);
}
