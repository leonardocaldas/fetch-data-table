<template>
    <div :class="rowClasses"
         class="grid-row flex"
         @click="onClickRow"
         @dblclick="onDoubleClickRow">

        <GridCheckbox
            :key="row._uuid"
            v-if="props.grid.config.checkboxEnabled"
            :row="row"
            @change="onRowChecked"
        />

        <GridRadioButton
            :key="row._uuid"
            :grid="props.grid"
            v-if="props.grid.config.radioButtonSelectionEnabled"
            :row="row"
            @selected="onRadioChecked"
        />

        <div
            class="grid-cell"
            :class="GridStyler.getCellTextAlignment(column, grid)"
            :id="column._uuid"
            v-for="column in columns"
            :style="columnStyle(column)"
            @click="onClickCell"
            @contextmenu.prevent="onContextMenu($event, column)"
        >
            <RuntimeRenderer
                :key="`${row._uuid}:${column._uuid}`"
                :content="valueGetter(column)"
            />
        </div>

        <GridAction :grid="props.grid" :row="row" v-if="props.grid.config.actions"/>
    </div>
</template>

<script setup lang="ts">
import GridCheckbox from "./GridCheckbox.vue"
import RuntimeRenderer from "./RuntimeRenderer.vue"
import GridAction from "./GridAction.vue"
import type {Column, GridComponent, Row} from "../types/types"
import {GridStyler} from "../utils/GridStyler"
import {computed, onUnmounted} from "vue"
import {CellValueGetter} from "../utils/CellValueGetter"
import ContextMenu from "@imengyu/vue3-context-menu"
import GridRadioButton from "./GridRadioButton.vue";
import {EventEmitter} from "../utils/EventEmitter";

const props = defineProps<{ row: Row, grid: GridComponent }>()

const columnStyle = (column: Column) => {
    const style = GridStyler.getBodyRowColumnStyle(column, props.grid)

    if (props.grid.config.onBeforeCellStyleMounted) {
        const newStyle = props.grid.config.onBeforeCellStyleMounted(valueGetter(column), column, props.row, props.grid)

        return {...style, ...newStyle}
    }

    if (column.onBeforeColumnStyleMounted) {
        const newStyle = column.onBeforeColumnStyleMounted(valueGetter(column), props.row, props.grid)

        return {...style, ...newStyle}
    }

    return style
}

const columns = computed(() => props.grid.getColumns())

const rowClasses = computed(() => {
    return {
        'grid-row-focused': props.row._hasFocus,
        'grid-row-checked': props.row._isChecked || props.row._isRadioChecked,
    }
})

const onClickCell = ($event: any) => {
    let target: any = $event.target

    if (!target.classList.contains("grid-cell")) {
        for (let i = 0; i < 5; i++) {
            if (target.parentNode) {
                target = target.parentNode

                if (target.classList.contains("grid-cell")) {
                    break
                }
            }
        }

        if (!target.classList.contains("grid-cell")) {
            return
        }
    }

    if (props.grid.focusedCell?.id == target.id) {
        return
    }

    target.classList.add("grid-cell-focused")
    props.grid.focusedCell?.classList?.remove("grid-cell-focused")
    props.grid.focusedCell = target
}

const onClickRow = () => {
    props.grid.config.onClickRow && props.grid.config.onClickRow(props.row, props.grid)
    EventEmitter.emit(props.grid, "row-focused", {row: props.row})
}

const onDoubleClickRow = () => props.grid.config.onDoubleClickRow && props.grid.config.onDoubleClickRow(props.row, props.grid)

const onContextMenu = ($event: any, column: Column) => {
    onClickRow()
    onClickCell($event)

    if (props.grid.config.onContextMenu) {
        const value = valueGetter(column)

        const items: any = props.grid.config.onContextMenu(value, column, props.row, props.grid)

        if (items && items.length > 0) {
            ContextMenu.showContextMenu({
                x: $event.x,
                y: $event.y,
                items: items
            })
        }
    }
}

const valueGetter = (column: Column) => CellValueGetter.get(column, props.row, props.grid)

const onRowChecked = (value: any) => {
    value == "false"
        ? props.grid.config.onRowChecked && props.grid.config.onRowChecked(props.row, 'checkbox')
        : props.grid.config.onRowUnchecked && props.grid.config.onRowUnchecked(props.row, 'checkbox')

    props.row._isChecked = !props.row._isChecked
}

const onRadioChecked = () => {
    props.grid
        .getRows()
        .filter((row: Row) => row._isRadioChecked)
        .forEach((row: Row) => {
            row._isRadioChecked = false
            props.grid.config.onRowUnchecked && props.grid.config.onRowUnchecked(row, 'radio')
        })

    props.grid.config.onRowChecked && props.grid.config.onRowChecked(props.row, 'radio')
    props.grid._selectedRadioRow = props.row;
    props.row._isRadioChecked = true
}

function onRowFocused(event: any) {
    if (props.grid.config.rowFocusEnabled) {
        if (props.row._hasFocus && event.row._uuid != props.row._uuid) {
            props.row._hasFocus = false
        }

        if (event.row._uuid == props.row._uuid) {
            props.row._hasFocus = true
        }
    }
}

EventEmitter.on("row-focused", onRowFocused)

onUnmounted(() => {
    EventEmitter.off("row-focused", onRowFocused)
})
</script>