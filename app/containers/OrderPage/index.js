import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setModule as setModuleAction } from 'containers/App/actions';
import OrderPage from './OrderPage';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  setModule: (module) => dispatch(setModuleAction(module)),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'order', reducer });
const withSaga = injectSaga({ key: 'order', saga });

export default compose(withReducer, withSaga, withConnect)(OrderPage);
