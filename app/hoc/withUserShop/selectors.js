import { createSelector } from 'reselect';
import { makeSelectUserShop } from 'containers/App/selectors';

const makeSelectIsShopSet = () => createSelector(
  makeSelectUserShop(),
  (userShop) => userShop !== null
);

export {
  makeSelectIsShopSet
};
