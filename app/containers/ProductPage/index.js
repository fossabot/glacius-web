import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { setModule as setModuleAction } from 'containers/App/actions';
import { connect } from 'react-redux';
import ProductPage from './ProductPage';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  setModule: (module) => dispatch(setModuleAction(module)),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'product', reducer });
const withSaga = injectSaga({ key: 'product', saga });

export default compose(withReducer, withSaga, withConnect)(ProductPage);
