import { store } from 'configureStore';
import Echo from 'laravel-echo';
import 'pusher-js';

export function getEcho(option = null) {
  if (!option) {
    const { token } = store.getState().global;

    option = {
      broadcaster: 'pusher',
      key: process.env.PUSHER_APP_KEY,
      authEndpoint: `${process.env.SERVER_BASE_URL}/broadcasting/auth`,
      cluster: process.env.PUSHER_APP_CLUSTER,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    };

    return new Echo(option);
  }
}
