import { createApp } from 'vue'
import App from './App.vue'
import './shopwareClient';
import './plugins/shopware'
import router from './router';

createApp(App).use(router).mount('#app');
