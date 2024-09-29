import type {GridComponent} from "../definition/types"

export class UrlBuilder {
    static getParams(grid: GridComponent): any {
        const params: any = {
            ...(grid.config.initialFilters ?? {}),
            ...grid.filters,
        }

        for (const name in params) {
            if (name.includes(".")) {
                const newName = name.split(".").reverse()[0]
                params[newName] = params[name]
                delete params[name]
            }
        }

        params["page"] = grid.currentPage
        params["limit"] = grid.rowsPerPage

        if (grid.orderBy) {
            params["order_by[field]"] = grid.orderBy.name
            params["order_by[direction]"] = grid.orderBy.direction
        }

        return params
    }

    static async getUrl(grid: GridComponent): Promise<string> {
        if (typeof grid.config.url == "function") {
            let urlFunction = grid.config.url()

            return urlFunction instanceof Promise ? await urlFunction : urlFunction
        }

        return grid.config.url
    }
}