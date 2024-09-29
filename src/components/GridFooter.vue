<template>
    <div class="grid-footer">
        <div class="left">
            <div>
                <div v-show="isRowsPerPageVisible" style="display: inline-block;" class="mr-xs">Por página:</div>
                <div v-show="isRowsPerPageVisible" style="width: 80px; display: inline-block;" class="mr-xs">
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
            </div>
        </div>
        <div class="right">
            <ul>
                <li>
                    <button @click="paginate(grid.currentPage - 1)" type="button" :disabled="!hasPreviousPage()">
                        <i class="icon-arrow-left5"></i></button>
                </li>
                <li :class="{'current': i === grid.currentPage}" :key="i" v-for="i in pagination()">
                    <button :disabled="i === grid.currentPage" @click="paginate(i)" type="button">{{ i }}</button>
                </li>
                <li>
                    <button @click="paginate(grid.currentPage + 1)" :disabled="!hasNextPage()" type="button">
                        <i class="icon-arrow-right5"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {GridComponent} from "../definition/types"
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
const rowsPerPageChanged = (rowsPerPage: number) => props.grid.paginate(props.grid.currentPage, rowsPerPage)

const isRowsPerPageVisible = computed(() => props.grid.config.isRowsPerPageVisible ?? true)
</script>