import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserShop } from 'containers/App/selectors';
import ShowOrder from './ShowOrder';
import { loadOrderData, storeOrderData } from '../actions';
import { makeSelectOrderData } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadOrderData: () => dispatch(loadOrderData()),
  storeOrderData: (orderData) => dispatch(storeOrderData(orderData)),
});

const mapStateToProps = createStructuredSelector({
  userShop: makeSelectUserShop(),
  orderData: makeSelectOrderData()
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowOrder);
