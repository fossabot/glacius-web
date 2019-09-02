import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsReady } from './selectors';
import withAuth from './withAuth';
import saga from './saga';
import { checkAuth as checkAuthAction } from './actions';

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(checkAuthAction())
});

const mapStateToProps = createStructuredSelector({
  isReady: makeSelectIsReady()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'withAuth', saga });

export default (Component) => compose(withSaga, withConnect, withAuth)(Component);
