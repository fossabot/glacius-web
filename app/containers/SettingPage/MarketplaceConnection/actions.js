import {
  LOAD_CONNECTION, STORE_CONNECTION_DATA, CONNECT, DISCONNECT
} from './constants';

export function loadConnection() {
  return {
    type: LOAD_CONNECTION
  };
}

export function storeConnectionData(connectionData) {
  return {
    type: STORE_CONNECTION_DATA,
    connectionData
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
