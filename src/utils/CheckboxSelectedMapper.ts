import type {Row, GridComponent} from "../types/types"

export class CheckboxSelectedMapper {
    static map(row: Row, grid: GridComponent) {
        if (typeof grid.config.isRowChecked == "function") {
            row._isChecked = grid.config.isRowChecked(row);
        }

        if (typeof grid.config.isCheckboxDisabled == "function") {
            row._isCheckboxDisabled = grid.config.isCheckboxDisabled(row);
        }

        return row;
    }
}