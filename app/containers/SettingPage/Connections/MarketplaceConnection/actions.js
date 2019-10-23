import {
  LOAD_MARKETPLACE, STORE_MARKETPLACE_DATA, CONNECT, DISCONNECT
} from './constants';

export function loadMarketplace() {
  return {
    type: LOAD_MARKETPLACE
  };
}

export function storeMarketplaceData(marketplaceData) {
  return {
    type: STORE_MARKETPLACE_DATA,
    marketplaceData
  };
}

export function connect(connectionName, additionalParams, onError) {
  return {
    type: CONNECT,
    connectionName,
    additionalParams,
    onError
  };
}

export function disconnect(connectionName) {
  return {
    type: DISCONNECT,
    connectionName
  };
}
