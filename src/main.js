import { createApp } from 'vue';
import App from './App.vue';
import './shopwareClient';
import './plugins/shopware';
import router from './router';
import { FontAwesomeIcon } from './plugins/font-awesome';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/global.scss';

const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
