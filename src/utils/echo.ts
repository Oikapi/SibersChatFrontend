import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.REACT_APP_PUSHER_KEY,
    wsPort: Number(import.meta.env.REACT_APP_WS_PORT) || 6001,
    forceTLS: false,
    disableStats: true,
});

export default echo;
