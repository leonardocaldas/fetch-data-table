import type {Row} from "../types/types"
// @ts-ignore
import {v4 as uuidV4} from "uuid"

export class UuidMapper {
    static add(row: Row): Row {
        if (!row._uuid) {
            row._uuid = uuidV4()
        }

        return row
    }
}