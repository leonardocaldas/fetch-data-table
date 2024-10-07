import {createApp} from 'vue';
import App from './App.vue';
import {SparkGrid} from '../src';
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import ptBR from 'element-plus/es/locale/lang/pt-br'
import mitt from "mitt";

ptBR.el.select.noData = ptBR.el.select.noMatch = "Nenhum registro encontrado."
ptBR.el.select.placeholder = "Selecione..."

const app = createApp(App);
const emitter = mitt()

app
    .use(ElementPlus, {locale: ptBR})
    .use(SparkGrid, {
        eventProxy: {
            emit: emitter.emit,
            on: emitter.on,
            off: emitter.off,
        }
    })

app.mount('#app');