import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserShop } from 'containers/App/selectors';
import ShowCustomer from './ShowCustomer';
import { loadCustomerData, storeCustomerData } from '../actions';
import { makeSelectCustomerData } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadCustomerData: () => dispatch(loadCustomerData()),
  storeCustomerData: (customerData) => dispatch(storeCustomerData(customerData)),
});

const mapStateToProps = createStructuredSelector({
  userShop: makeSelectUserShop(),
  customerData: makeSelectCustomerData()
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowCustomer);
