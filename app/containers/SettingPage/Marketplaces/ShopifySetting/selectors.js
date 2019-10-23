import { createSelector } from 'reselect';

const selectShopifySetting = (state) => state.shopifySetting;

const makeSelectShopifySettingData = () => createSelector(
  selectShopifySetting,
  (shopifySettingState) => shopifySettingState.settingData
);

export {
  makeSelectShopifySettingData,
};
