import type {Row, Column, GridComponent} from "../types/types"
// @ts-ignore
import getValue from 'get-value'

export class CellValueGetter {
    static get(column: Column, row: Row, grid: GridComponent): any {
        return () => {
            let value = getValue(row, column.name)

            if (column.valueGetter) {
                value = column.valueGetter(value, row, grid)
            }

            if (grid.config.onBeforeCellMounted) {
                value = grid.config.onBeforeCellMounted(value, column, row, grid)
            }

            return value ?? ""
        }
    }
}