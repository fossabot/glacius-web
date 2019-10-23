import { createSelector } from 'reselect';

const selectWoocommerceSetting = (state) => state.woocommerceSetting;

const makeSelectWoocommerceSettingData = () => createSelector(
  selectWoocommerceSetting,
  (woocommerceSettingState) => woocommerceSettingState.settingData
);

export {
  makeSelectWoocommerceSettingData,
};
