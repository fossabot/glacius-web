import { createSelector } from 'reselect';

const selectLogin = (state) => state.login;

const makeSelectEmail = () => createSelector(
  selectLogin,
  (loginState) => loginState.email
);

const makeSelectPassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.password
);

const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.error
);

export {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectError
};
