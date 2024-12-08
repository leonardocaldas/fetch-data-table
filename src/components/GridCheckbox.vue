<template>
    <div class="grid-cell" :style="GridStyler.getCheckboxColumnStyles()">
        <div class="checker">
            <span :class="{'checked': row._isChecked}">
                <input
                    type="checkbox"
                    :name="row._uuid"
                    :disabled="row._isCheckboxDisabled"
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
import type {Row} from "../types/types"

const props = defineProps<{
    row: Row
}>()

const emits = defineEmits(['change'])
</script>