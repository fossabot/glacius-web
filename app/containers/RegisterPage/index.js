import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import RegisterPage from './RegisterPage';
import { register } from './actions';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  register: (values, formActions) => dispatch(register(values, formActions)),
  navigateToLoginPage: () => dispatch(push('/login')),
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'register', saga });

export default compose(withSaga, withConnect)(RegisterPage);
