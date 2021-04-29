import { register } from 'register-service-worker'

let random = Math.random().toString().slice(2);
let url = `/static/js/servicework.js?random=${random}`;

localStorage.setItem(`SERVICE_WORKER_REGISTER`, url);

register(url, {
    ready() {
        console.log('App is being served from cache by a service worker.For more details')
    },
    cached() {
        console.log('Content has been cached for offline use.')
    },
    updated() {
        console.log('New content is available; please refresh.')
    },
    offline() {
        console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
        console.log('Error during service worker registration:', error)
    }
})