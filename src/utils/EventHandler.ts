import type {Column, GridComponent, OrderBy, Row} from "../types"
import {GridColumnType} from ".."
import {UuidMapper} from "./UuidMapper"
// @ts-ignore
import {v4 as uuid} from "uuid"
import {isEmpty} from "./Conditionals"
import {CheckboxSelectedMapper} from "./CheckboxSelectedMapper"
// @ts-ignore
import getValue from 'get-value'
import type {ComponentPublicInstance} from "@vue/runtime-core";
import {EventEmitter} from "./EventEmitter";
import {RadioButtonSelectedMapper} from "./RadioButtonSelectedMapper";

export class EventHandler {
    static refresh(this: GridComponent): void {
        this.fetch()
    }

    static setRows(this: GridComponent, rows: Row[]): Row[] {
        rows = rows
            .map(UuidMapper.add)
            .map((row: Row) => CheckboxSelectedMapper.map(row, this))
            .map((row: Row) => RadioButtonSelectedMapper.map(row, this))

        if (this.config.onBeforeRowMounted) {
            for (let i in rows) {
                rows[i] = this.config.onBeforeRowMounted(rows[i], this)
            }
        }

        this.rows = rows

        return rows
    }

    static clearRows(this: GridComponent): void {
        this.rows = []
    }

    static getRows(this: GridComponent): Row[] {
        return this.rows
    }

    static getCheckedRows(this: GridComponent): Row[] {
        return this.rows.filter((row: Row) => Boolean(row._isChecked));
    }

    static clearCheckedRows(this: GridComponent): void {
        this.rows.forEach((row: Row) => {
            row._isChecked = false
        });
    }

    static getColumns(this: GridComponent): Column[] {
        let columns = this.config.columns

        if (typeof columns == "function") {
            columns = columns()
        }

        return columns
            .filter((column: Column) => {
                if (typeof column.isVisible == "function") {
                    return column.isVisible();
                }

                return true;
            })
            .map((col: Column) => {
                return {
                    _uuid: uuid(),
                    ...col,
                }
            })
    }

    static applyFilter(this: GridComponent, column: Column, value: any): void {
        this.setFilter(column.filterName || column.name, value)
        this.currentPage = 1
        this.fetch()
    }

    static setFilter(this: GridComponent & ComponentPublicInstance, name: string, value: any): void {
        value = isEmpty(value) ? "" : value
        this.filters[name] = value
        this.currentPage = 1
        EventEmitter.emit(this, "grid-filter", {name: name, value, uuid: this.uuid})
    }

    static setFilters(this: GridComponent, filters: any): void {
        for (const filterName in filters) {
            this.setFilter(filterName, filters[filterName])
        }
    }

    static paginate(this: GridComponent, page: number, rowsPerPage: number): void {
        this.currentPage = page
        this.rowsPerPage = rowsPerPage
        this.fetch()
    }

    static applyOrderBy(this: GridComponent, orderBy: OrderBy): void {
        this.orderBy = orderBy
        this.fetch()
    }

    static getSummarizedValue(this: GridComponent, column: Column, onlyIsChecked: boolean = true): any {
        const isCurrency = column.type == GridColumnType.CURRENCY || (column.isCreatedDynamically && column.metadata?.value_formatter == "currency")
        const isNumber = column.type == GridColumnType.NUMBER

        if (isCurrency || isNumber || column.summarizerValueGetter) {
            let value = this.getRows()
                .filter((row: Row) => onlyIsChecked && this.config.summarizeOnlyChecked ? row._isChecked : true)
                .map((row: Row) => {
                    const value = getValue(row, column.name);

                    if (column.summarizerValueGetter) {
                        return column.summarizerValueGetter(value, row)
                    }

                    return value
                })
                .filter((value: any) => !isNaN(value) && isFinite(value) && parseFloat(value) == value)
                .map(parseFloat)
                .reduce((a: number, b: number) => a + b, 0)

            return column.summarizerValueFormatter
                ? column.summarizerValueFormatter(value)
                : value
        }

        return null
    }

    static getSelectedRadioRow(this: GridComponent) {
        return this._selectedRadioRow
    }

    static setSelectedRadioRow(this: GridComponent, row: Row): void {
        this.clearRadioRowSelection()

        this.config.onRowChecked && this.config.onRowChecked(row, 'radio')

        this._selectedRadioRow = row
        row._isRadioChecked = true
    }

    static clearRadioRowSelection(this: GridComponent): void {
        this._selectedRadioRow = null

        this.getRows()
            .filter((row: Row) => row._isRadioChecked)
            .forEach((row: Row) => {
                row._isRadioChecked = false
                this.config.onRowUnchecked && this.config.onRowUnchecked(row, 'radio')
            })

    }
}