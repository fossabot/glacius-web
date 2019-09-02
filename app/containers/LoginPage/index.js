import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { push } from 'connected-react-router';
import { attemptLogin } from './actions';
import saga from './saga';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  login: (values, formActions) => dispatch(attemptLogin(values, formActions)),
  navigateToRegisterPage: () => dispatch(push('/register'))
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'login', saga });

export default compose(withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };
