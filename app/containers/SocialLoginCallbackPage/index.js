import { createStructuredSelector } from 'reselect';
import { makeSelectLocationQueryString } from 'containers/App/selectors';
import { connect } from 'react-redux';
import { loginUser } from 'hoc/withAuth/actions';
import { push } from 'connected-react-router';
import SocialLoginCallbackPage from './SocialLoginCallbackPage';

const mapDispatchToProps = (dispatch) => ({
  loginWithToken: (token) => dispatch(loginUser(token)),
  navigateToPortalPage: () => dispatch(push('/portal')),
  navigateToLoginPage: () => dispatch(push('/login')),
});

const mapStateToProps = createStructuredSelector({
  queryString: makeSelectLocationQueryString(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SocialLoginCallbackPage);
