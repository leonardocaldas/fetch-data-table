<template>
    <div class="grid-cell" :style="GridStyler.getCheckboxColumnStyles()">
        <div class="checker">
            <span :class="{'checked': row._isChecked}">
                <input
                    type="checkbox"
                    :name="row._uuid"
                    :disabled="disabled"
                    @input="emits('change', $event.target.value)"
                    class="styled"
                    :value="row._isChecked"
                    :checked="row._isChecked"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {GridStyler} from "../utils/GridStyler"
import type {Row} from "../definition/types"

const props = defineProps<{
    row: Row,
    disabled?: boolean
}>()

const emits = defineEmits(['change'])
</script>