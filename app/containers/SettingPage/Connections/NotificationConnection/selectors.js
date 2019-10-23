import { createSelector } from 'reselect';

const selectNotificationConnection = (state) => state.notificationConnection;

const makeSelectNotificationConnectionData = () => createSelector(
  selectNotificationConnection,
  (notificationConnectionState) => notificationConnectionState.notificationData
);

const makeSelectNotification = (notification) => createSelector(
  makeSelectNotificationConnectionData(),
  (notificationConnectionData) => notificationConnectionData.find((o) => o.name === notification)
);

const makeSelectTelegram = () => createSelector(
  makeSelectNotification('telegram'),
  (isTelegramConnected) => isTelegramConnected
);

export {
  makeSelectNotificationConnectionData,
  makeSelectTelegram,
};
