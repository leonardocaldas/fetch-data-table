import type {App} from "vue";
import DynaGrid from "./SparkGrid.vue";
import type {InstallOptions} from "./definition/install";
import {EventEmitter} from "./utils/EventEmitter";

export const DataTable: any = {
    install(app: App, options: InstallOptions) {
        app.component("SparkGrid", DynaGrid)
        EventEmitter.eventProxy = options.eventProxy
    }
}