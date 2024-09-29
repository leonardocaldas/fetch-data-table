import {createApp} from 'vue';
import App from './App.vue';
import {DataTable} from '../src/index';
import mitt from "mitt";

const app = createApp(App);
const emitter = mitt()

app.use(DataTable, {
    eventProxy: {
        emit: emitter.emit,
        on: emitter.on,
        off: emitter.off,
    }
})

app.mount('#app');