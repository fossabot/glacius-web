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

const makeSelectCurrentModule = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentModule
);

export {
  makeSelectLocation,
  makeSelectLocationQueryString,
  makeSelectToken,
  makeSelectUserProfile,
  makeSelectUserShop,
  makeSelectCurrentModule
};
