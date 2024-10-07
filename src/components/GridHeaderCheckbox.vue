<template>
    <div :style="GridStyler.getCheckboxColumnStyles()">
        <div class="checker">
            <span :class="{'checked': hasAnyChecked}">
                <input
                    type="checkbox"
                    :name="grid.uuid"
                    @input="onChange($event.target.value)"
                    class="styled"
                    :value="hasAnyChecked"
                    :checked="hasAnyChecked"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {GridStyler} from "../utils/GridStyler"
import type {GridComponent, Row} from "../types/types"
import {computed} from "vue"

const props = defineProps<{
    grid: GridComponent
}>()

const hasAnyChecked = computed(() => {
    return props.grid
        .getRows()
        .filter((row: Row) => row._isChecked)
        .length > 0
})

const onChange = function (value: any) {
    const isNotChecked = value == "false"

    props.grid.getRows().forEach((row: Row) => {
        row._isChecked = isNotChecked
    })
}
</script>