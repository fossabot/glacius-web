import { RESEND_VERIFICATION_EMAIL, CHECK_IS_EMAIL_VERIFIED } from './constants';

export function resendVerificationEmail() {
  return {
    type: RESEND_VERIFICATION_EMAIL
  };
}

export function checkIsEmailVerified() {
  return {
    type: CHECK_IS_EMAIL_VERIFIED
  };
}
