<template>
    <div class="grid-footer">
        <div class="spark-grid-pages">
            <div v-show="isRowsPerPageVisible" class="spark-grid__page-details">Por página:</div>
            <div v-show="isRowsPerPageVisible" class="spark-grid__select">
                <el-select :model-value="grid.rowsPerPage" @update:modelValue="rowsPerPageChanged">
                    <el-option :value="10" label="10"/>
                    <el-option :value="25" label="25"/>
                    <el-option :value="50" label="50"/>
                    <el-option :value="100" label="100"/>
                    <el-option :value="150" label="150"/>
                    <el-option :value="200" label="200"/>
                    <el-option :value="250" label="250"/>
                    <el-option :value="500" label="500"/>
                    <el-option :value="1000" label="1000"/>
                    <el-option :value="2500" label="2500"/>
                </el-select>
            </div>

            <span v-show="grid.totalRows > 0">
                Exibindo {{ beginningRows() }} a {{ endingRows() }} de {{ grid.totalRows }} registro(s)
            </span>

            <span class="spark-grid-selected-rows">
                <span v-if="selectedRowsLength > 0 && grid.config.checkboxEnabled">{{ selectedRowsLength }} registro(s) selecionado(s)</span>
            </span>

            <ul>
                <li>
                    <button @click="paginate(grid.currentPage - 1)" type="button" :disabled="!hasPreviousPage()">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                </li>
                <li :class="{'current': i === grid.currentPage}" :key="i" v-for="i in pagination()">
                    <button :disabled="i === grid.currentPage" @click="paginate(i)" type="button">{{ i }}</button>
                </li>
                <li>
                    <button @click="paginate(grid.currentPage + 1)" :disabled="!hasNextPage()" type="button">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {GridComponent} from "../types"
import {computed} from "vue"

const props = defineProps<{ grid: GridComponent }>()

const beginningRows = () => {
    return (props.grid.currentPage * props.grid.rowsPerPage) - props.grid.rowsPerPage + 1
}

const endingRows = () => {
    const end = props.grid.currentPage * props.grid.rowsPerPage
    return end > props.grid.totalRows ? props.grid.totalRows : end
}

const pagination = () => {
    const page = props.grid.currentPage
    let pages = [page]
    let right = pagesRight()
    let left = pagesLeft()

    for (let i = page + 1; i <= right; i++) pages.push(i)
    for (let i = page - 1; i >= left; i--) pages.unshift(i)

    return pages
}

const pagesLeft = () => {
    const iteration = props.grid.currentPage - 5
    return iteration >= 1 ? iteration : 1
}

const pagesRight = () => {
    const iteration = props.grid.currentPage + 5
    return iteration > totalPages() ? totalPages() : iteration
}

const totalPages = () => {
    if (props.grid.totalRows <= 0) {
        return 0;
    }

    return Math.ceil(props.grid.totalRows / props.grid.rowsPerPage)
}
const hasPreviousPage = () => props.grid.currentPage > 1
const hasNextPage = () => props.grid.currentPage < totalPages()

const paginate = (page: number) => props.grid.paginate(page, props.grid.rowsPerPage)
const rowsPerPageChanged = (rowsPerPage: number) => props.grid.paginate(1, rowsPerPage)

const isRowsPerPageVisible = computed(() => props.grid.config.isRowsPerPageVisible ?? true)

const selectedRowsLength = computed(() => props.grid.getCheckedRows().length)
</script>

<style scoped lang="scss">
.spark-grid-pages {
    display: flex;
    align-items: center;
}

.spark-grid__page-details {
    display: inline-block;
}

.spark-grid__select {
    width: 80px;
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
}

.spark-grid-icon-arrow-left {
    &:before {
        content: "\f053";
    }
}

.spark-grid-selected-rows {
    margin-left: 25px;
    flex: 1;
    text-align: center;
    color: royalblue;
    font-weight: bold;
}
</style>