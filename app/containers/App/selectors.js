import { createSelector } from 'reselect';
import qs from 'query-string';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.location
);

const makeSelectLocationQueryString = () => createSelector(
  makeSelectLocation(),
  (routeLocationState) => {
    if (routeLocationState.search) {
      return qs.parse(routeLocationState.search);
    }

    return routeLocationState.search;
  }
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.token
);

const makeSelectUserProfile = () => createSelector(
  selectGlobal,
  (globalState) => globalState.userProfile
);

const makeSelectUserShop = () => createSelector(
  selectGlobal,
  (globalState) => globalState.userShop
);

const makeSelectIsUserShopLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.isUserShopLoading
);

const makeSelectCurrentModule = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentModule
);

const makeSelectIsEmailVerified = () => createSelector(
  selectGlobal,
  (globalState) => globalState.isEmailVerified
);

export {
  makeSelectLocation,
  makeSelectLocationQueryString,
  makeSelectToken,
  makeSelectUserProfile,
  makeSelectUserShop,
  makeSelectIsUserShopLoading,
  makeSelectCurrentModule,
  makeSelectIsEmailVerified,
};
