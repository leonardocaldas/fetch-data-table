<template>
    <div class="grid-cell" :style="columnStyle()">
        <div class="choice">
            <span :class="{'checked': row._isRadioChecked}">
                <input
                    type="radio"
                    :id="row._uuid"
                    :name="grid.uuid"
                    :disabled="disabled"
                    @input="emits('selected')"
                    class="styled"
                    :value="row._uuid"
                    :checked="row._isRadioChecked"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {GridStyler} from "../utils/GridStyler"
import type {Row, GridComponent} from "../types/types"

const props = defineProps<{
    row: Row,
    grid: GridComponent
    disabled?: boolean
}>()

const columnStyle = () => {
    const style = GridStyler.getCheckboxColumnStyles()

    if (props.grid.config.onBeforeCheckboxAndRadioButtonStyleMounted) {
        const newStyle = props.grid.config.onBeforeCheckboxAndRadioButtonStyleMounted(props.row, props.grid)

        return {...style, ...newStyle}
    }

    return style
}

const emits = defineEmits(['selected'])
</script>