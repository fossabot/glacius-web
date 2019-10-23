import {
  LOAD_NOTIFICATION, STORE_NOTIFICATION_DATA, CONNECT, DISCONNECT
} from './constants';

export function loadNotification() {
  return {
    type: LOAD_NOTIFICATION
  };
}

export function storeNotificationData(notificationData) {
  return {
    type: STORE_NOTIFICATION_DATA,
    notificationData
  };
}

export function connect(connectionName) {
  return {
    type: CONNECT,
    connectionName,
  };
}

export function disconnect(connectionName) {
  return {
    type: DISCONNECT,
    connectionName
  };
}
