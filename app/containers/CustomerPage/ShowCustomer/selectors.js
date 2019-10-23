import { createSelector } from 'reselect';
import { selectCustomer } from '../selectors';

const makeSelectCustomerData = () => createSelector(
  selectCustomer,
  (customerState) => customerState.customerData
);

export {
  makeSelectCustomerData
};
