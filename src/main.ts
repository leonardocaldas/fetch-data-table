import {createApp} from 'vue';
import App from './App.vue';

import {DataTable} from './index';

const app = createApp(App);

app.use(DataTable);

app.mount('#app');