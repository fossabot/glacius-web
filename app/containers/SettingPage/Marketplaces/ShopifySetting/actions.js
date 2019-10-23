import {
  LOAD_SHOPIFY_SETTING, STORE_SHOPIFY_SETTING, UPDATE_SHOPIFY_SETTING
} from './constants';

export function loadShopifySetting() {
  return {
    type: LOAD_SHOPIFY_SETTING
  };
}

export function storeShopifySetting(settingData) {
  return {
    type: STORE_SHOPIFY_SETTING,
    settingData
  };
}

export function updateShopifySetting(settingData) {
  return {
    type: UPDATE_SHOPIFY_SETTING,
    settingData
  };
}
