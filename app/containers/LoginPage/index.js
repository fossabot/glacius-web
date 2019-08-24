import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { attemptLogin } from './actions';
import saga from './saga';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(attemptLogin(email, password)),
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'login', saga });

export default compose(withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };
