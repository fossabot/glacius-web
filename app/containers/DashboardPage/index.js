import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setModule as setModuleAction } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import Dashboard from './Dashboard';

const mapDispatchToProps = (dispatch) => ({
  setModule: (module) => dispatch(setModuleAction(module))
});

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(withReducer, withSaga, withConnect)(Dashboard);
export { mapDispatchToProps };
