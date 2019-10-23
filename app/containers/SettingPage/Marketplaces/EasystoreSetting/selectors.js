import { createSelector } from 'reselect';

const selectEasystoreSetting = (state) => state.easystoreSetting;

const makeSelectEasystoreSettingData = () => createSelector(
  selectEasystoreSetting,
  (easystoreSettingState) => easystoreSettingState.settingData
);

export {
  makeSelectEasystoreSettingData,
};
