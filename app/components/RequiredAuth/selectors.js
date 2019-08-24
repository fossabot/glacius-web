import { createSelector } from 'reselect';
import { makeSelectToken, makeSelectUserProfile } from 'containers/App/selectors';

const makeSelectIsReady = () => createSelector(
  makeSelectToken(),
  makeSelectUserProfile(),
  (token, userProfile) => !!token && !!userProfile
);

export {
  makeSelectIsReady
};
