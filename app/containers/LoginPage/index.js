import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { attemptLogin, reset } from './actions';
import { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginPage from './LoginPage';


const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => dispatch(attemptLogin(email, password)),
  resetError: () => dispatch(reset()),
});

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };
