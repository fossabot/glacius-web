import { createSelector } from 'reselect';
import {
  makeSelectToken, makeSelectUserProfile, makeSelectUserShop, makeSelectIsEmailVerified
} from 'containers/App/selectors';

const makeSelectIsReady = () => createSelector(
  makeSelectToken(),
  makeSelectUserProfile(),
  makeSelectUserShop(),
  makeSelectIsEmailVerified(),
  (token, userProfile, userShop, isEmailVerified) => !!token && !!userProfile && (!isEmailVerified || (!!userShop || userShop === null)) // null means shop haven set
);

export {
  makeSelectIsReady
};
