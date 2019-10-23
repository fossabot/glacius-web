import {
  all,
  call, put, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { setIsEmailVerified } from 'containers/App/actions';
import { loadUserShop } from 'hoc/withAuth/actions';
import { RESEND_VERIFICATION_EMAIL, CHECK_IS_EMAIL_VERIFIED } from './constants';

export function* resendVerificationEmail() {
  try {
    const res = yield call(request, {
      url: '/user/email/resend',
      method: 'POST'
    });
  } catch (err) {
  }
}

export function* checkIsEmailVerified() {
  try {
    const res = yield call(request, {
      url: '/user/email/is-verified',
      method: 'GET'
    });

    yield all([
      put(setIsEmailVerified(true)),
      put(loadUserShop())
    ]);
  } catch (err) {
    // ignore err as being handled by request utils
  }
}

export default function* () {
  yield takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmail);
  yield takeLatest(CHECK_IS_EMAIL_VERIFIED, checkIsEmailVerified);
}
