import type {Row, Column, GridComponent} from "../definition/types"
// @ts-ignore
import getValue from 'get-value'

export class CellValueGetter {
    static get(column: Column, row: Row, grid: GridComponent): any {
        return () => {
            let value = getValue(row, column.name)

            if (column.onBeforeCellContentRendered) {
                value = column.onBeforeCellContentRendered(value, row, grid)
            }

            if (grid.config.onBeforeCellMounted) {
                value = grid.config.onBeforeCellMounted(value, column, row, grid)
            }

            return value ?? ""
        }
    }
}