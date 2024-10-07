import {EventEmitter} from "../utils/EventEmitter"
import {UrlBuilder} from "../utils/UrlBuilder"
import Axios from "axios"
import type {GridComponent} from "../types/types"

export class DataFetcher {
    static async fetch(this: GridComponent): Promise<void> {
        const showLoading: boolean = this.config.showLoadingDuringRequest ?? true

        EventEmitter.onRequestStarted(this)

        if (showLoading) {
            this.loading = true
        }

        try {
            const response: any = await DataFetcher._fetchData.call(this)

            EventEmitter.onRequestFinished(response, this)

            if (response.rows?.length >= 0 && response.total >= 0 && response.page) {
                this.setRows(response.rows)
                this.totalRows = response.total
                this.currentPage = response.page
            } else {
                this.setRows(response)
                this.totalRows = response.length
                this.currentPage = 1
            }

        } finally {
            if (showLoading) {
                this.loading = false
            }
        }
    }

    static async _fetchData(this: GridComponent): Promise<any> {
        if (this.config.datasource) {
            return this.config.datasource(UrlBuilder.getParams(this))
        }

        const url: string = await UrlBuilder.getUrl(this)
        return await Axios.get(url, {params: UrlBuilder.getParams(this)})
    }
}