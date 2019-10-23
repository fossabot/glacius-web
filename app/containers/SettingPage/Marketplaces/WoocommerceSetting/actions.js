import {
  LOAD_WOOCOMMERCE_SETTING, STORE_WOOCOMMERCE_SETTING, UPDATE_WOOCOMMERCE_SETTING
} from './constants';

export function loadWoocommerceSetting() {
  return {
    type: LOAD_WOOCOMMERCE_SETTING
  };
}

export function storeWoocommerceSetting(settingData) {
  return {
    type: STORE_WOOCOMMERCE_SETTING,
    settingData
  };
}

export function updateWoocommerceSetting(settingData) {
  return {
    type: UPDATE_WOOCOMMERCE_SETTING,
    settingData
  };
}
