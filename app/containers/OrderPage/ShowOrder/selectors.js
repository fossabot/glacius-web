import { createSelector } from 'reselect';
import { selectOrder } from '../selectors';

const makeSelectOrderData = () => createSelector(
  selectOrder,
  (orderState) => orderState.orderData
);

export {
  makeSelectOrderData
};
