import { createSelector } from 'reselect';
import { selectProduct } from '../selectors';

const makeSelectProductData = () => createSelector(
  selectProduct,
  (productState) => productState.productData
);

export {
  makeSelectProductData
};
