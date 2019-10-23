import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { resendVerificationEmail, checkIsEmailVerified } from './actions';
import EmailVerification from './EmailVerification';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  checkIsEmailVerified: () => dispatch(checkIsEmailVerified()),
  resendVerificationEmail: () => dispatch(resendVerificationEmail()),
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'emailVerification', saga });

export default compose(withSaga, withConnect)(EmailVerification);
