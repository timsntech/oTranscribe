
require('./scss/base.scss');

import init from './js/app/init';

window.addEventListener('DOMContentLoaded', () => {
    init();    
});

if ('serviceWorker' in navigator) {
    const isLocal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
    if (isLocal) {
        navigator.serviceWorker.getRegistrations()
            .then(registrations => registrations.forEach(registration => registration.unregister()))
            .catch(() => {});
        if (window.caches) {
            window.caches.keys()
                .then(keys => keys.forEach(key => window.caches.delete(key)))
                .catch(() => {});
        }
    } else {
        navigator.serviceWorker.register('service-worker.js').catch(() => {});
    }
}
