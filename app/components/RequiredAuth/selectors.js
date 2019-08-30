import { createSelector } from 'reselect';
import { makeSelectToken, makeSelectUserProfile, makeSelectUserShop } from 'containers/App/selectors';

const makeSelectIsReady = () => createSelector(
  makeSelectToken(),
  makeSelectUserProfile(),
  makeSelectUserShop(),
  (token, userProfile, userShop) => !!token && !!userProfile && !!userShop
);

export {
  makeSelectIsReady
};
