import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

console.log(import.meta.env)

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_APP_PUSHER_KEY,
    cluster: import.meta.env.VITE_APP_PUSHER_CLUSTER,
    forceTLS: true,
    wsPort: Number(import.meta.env.REACT_APP_WS_PORT) || 6001,
    disableStats: true,
});

export default echo;
