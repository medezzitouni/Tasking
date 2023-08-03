import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store/index';

createApp(App).use(store, key).mount('#app');
