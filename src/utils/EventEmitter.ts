import type {GridComponent} from "../types/types"
import type {EventProxy, EventReceived} from "../types/install";

export class EventEmitter {
    static eventProxy: EventProxy|null|undefined = null;

    static onRequestStarted(state: GridComponent) {
        if (typeof state.config.onRequestStarted == "function") {
            state.config.onRequestStarted(state)
        }
    }

    static onRequestFinished(response: any, state: GridComponent) {
        if (typeof state.config.onRequestFinished == "function") {
            state.config.onRequestFinished(response, state)
        }
    }

    static emit(grid: GridComponent, name: string, data: any): void {
        grid.$emit(name, data)
        this.eventProxy?.emit(name, data)
    }

    static on(name: string, data: EventReceived): void {
        this.eventProxy?.on(name, data)
    }

    static off(name: string, data: EventReceived): void {
        this.eventProxy?.off(name, data)
    }
}