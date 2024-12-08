<template>
    <div :style="GridStyler.getCheckboxColumnStyles()">
        <div class="checker">
            <span :class="{'checked': hasAnyChecked}">
                <input
                    type="checkbox"
                    :name="grid.uuid"
                    @input="onChange($event.target.value)"
                    class="styled"
                    :disabled="isCheckboxHeaderDisabled"
                    :value="hasAnyChecked"
                    :checked="hasAnyChecked"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {GridStyler} from "../utils/GridStyler"
import {GridComponent, IsCheckboxHeaderDisabled, Row} from "../types/types"
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

        if (row._isCheckboxDisabled !== true) {
            if (row._isChecked) {
                props.grid.config.onRowChecked && props.grid.config.onRowChecked(row, 'checkbox');
            } else {
                props.grid.config.onRowUnchecked && props.grid.config.onRowUnchecked(row, 'checkbox');
            }
        }
    })
}

const isCheckboxHeaderDisabled = computed(() => {
    if (props.grid.config.isCheckboxHeaderDisabled) {
        return props.grid.config.isCheckboxHeaderDisabled(props.grid)
    }

    return false
})
</script>