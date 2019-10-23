import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setModule as setModuleAction } from 'containers/App/actions';
import CustomerPage from './CustomerPage';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  setModule: (module) => dispatch(setModuleAction(module)),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customer', reducer });
const withSaga = injectSaga({ key: 'customer', saga });

export default compose(withReducer, withSaga, withConnect)(CustomerPage);
