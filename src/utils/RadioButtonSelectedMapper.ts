import type {GridComponent, Row} from "../definition/types"

export class RadioButtonSelectedMapper {
    static map(row: Row, grid: GridComponent) {
        if (grid._selectedRadioRow) {
            const uuidMatches = row._uuid == grid._selectedRadioRow._uuid
            const idMatches = row.id == grid._selectedRadioRow.id

            if (uuidMatches || idMatches) {
                row._isRadioChecked = true;
            }

        }

        return row;
    }
}