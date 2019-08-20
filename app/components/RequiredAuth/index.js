import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectToken, makeSelectUserProfile } from 'containers/App/selectors';
import RequiredAuth from './RequiredAuth';
import saga from './saga';
import { checkAuth as checkAuthAction } from './actions';

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(checkAuthAction())
});

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  userProfile: makeSelectUserProfile()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'RequiredAuth', saga });

export default (Component, isAuthRequired = true) => compose(withSaga, withConnect)(RequiredAuth(Component, isAuthRequired));
