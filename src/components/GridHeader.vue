<template>
    <div class="grid-header" :class="{'grid-header-sticky': grid.config.stickyHeaderEnabled}">
        <div class="grid-header-cell" v-if="props.grid.config.checkboxEnabled" :style="GridStyler.getCheckboxColumnStyles()">
            <GridHeaderCheckbox :grid="grid"/>
        </div>

        <div class="grid-header-cell" v-if="props.grid.config.radioButtonSelectionEnabled" :style="GridStyler.getCheckboxColumnStyles()"></div>

        <div class="grid-header-cell"
             v-for="column in grid.getColumns()"
             :key="column.name + column.label"
             @click="changeOrder(column.name)"
             :class="{
                 'grid-header-order': props.grid.config.orderByEnabled != false,
                 ...GridStyler.getCellTextAlignment(column, grid),
             }"
             :style="GridStyler.getHeaderRowColumnStyle(column, props.grid)">

            <RuntimeRenderer :content="columnContent(column)"/>

            <span v-if="isAscending(column.name)">
                <i class="fa-solid fa-sort-up"></i>
            </span>

            <span v-else-if="isDescending(column.name)">
                <i class="fa-solid fa-sort-down"></i>
            </span>

            <span v-else>
                <i class="fa-solid fa-sort"></i>
            </span>
        </div>

        <div
            :style="GridStyler.getActionRowColumn(props.grid)"
            v-if="props.grid.config.actions"
            class="text-center grid-header-cell">
            Ações
        </div>
    </div>
</template>

<script setup lang="ts">
import RuntimeRenderer from "./RuntimeRenderer.vue"
import GridHeaderCheckbox from "./GridHeaderCheckbox.vue"
import {GridStyler} from "../utils/GridStyler"
import type {Column, GridComponent} from "../types/types"
import {computed} from "vue"

const props = defineProps<{ grid: GridComponent }>()

const isSortedBy = (name: string) => props.grid.orderBy?.name === name
const isAscending = (name: any) => isSortedBy(name) && props.grid.orderBy?.direction === "asc"
const isDescending = (name: any) => isSortedBy(name) && props.grid.orderBy?.direction === "desc"
const getSortDirection = (name: any) => isAscending(name) ? "desc" : "asc"
const changeOrder = (name: any) => {
    if (props.grid.config.orderByEnabled ?? true) {
        props.grid.applyOrderBy({
            name,
            direction: getSortDirection(name)
        })
    }
}

const columns = computed(() => props.grid.config.columns)

const columnContent = (column: Column) => {
    let label = null

    if (props.grid.config.onBeforeHeaderCellMounted) {
        label = props.grid.config.onBeforeHeaderCellMounted(column, props.grid)
    }

    if (column.headerContentGetter) {
        label = column.headerContentGetter(label, props.grid)
    }

    return label ?? column.label
}
</script>

<style scoped>

</style>