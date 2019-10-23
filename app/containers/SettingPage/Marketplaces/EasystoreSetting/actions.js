import {
  LOAD_EASYSTORE_SETTING, STORE_EASYSTORE_SETTING, UPDATE_EASYSTORE_SETTING
} from './constants';

export function loadEasystoreSetting() {
  return {
    type: LOAD_EASYSTORE_SETTING
  };
}

export function storeEasystoreSetting(settingData) {
  return {
    type: STORE_EASYSTORE_SETTING,
    settingData
  };
}

export function updateEasystoreSetting(settingData) {
  return {
    type: UPDATE_EASYSTORE_SETTING,
    settingData
  };
}
