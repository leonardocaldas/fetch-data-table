import type {App} from "vue";
import SparkGridComponent from "./SparkGrid.vue";
import type {InstallOptions} from "./types";
import {EventEmitter} from "./utils/EventEmitter";

export const SparkGrid: any = {
    install(app: App, options: InstallOptions) {
        app.component("SparkGrid", SparkGridComponent)
        EventEmitter.eventProxy = options.eventProxy
    }
}