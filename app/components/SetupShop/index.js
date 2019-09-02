import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import SetupShop from './SetupShop';
import { createShop } from './actions';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  createShop: (values, formActions) => dispatch(createShop(values, formActions))
});

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'setupShop', saga });

export default compose(withSaga, withConnect)(SetupShop);
