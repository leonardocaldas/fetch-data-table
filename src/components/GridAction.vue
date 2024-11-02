<template>
    <div class="grid-cell" :style="GridStyler.getActionRowColumn(grid)">
        <template v-for="(action, i) in grid.config.actions">
            <RuntimeRenderer
                v-if="isVisible(action)"
                :key="`${row._uuid}:_actions`"
                :content="action.element(row)"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>
import {Action, GridComponent, Row} from "../types";
import {GridStyler} from "../utils/GridStyler";
import RuntimeRenderer from "./RuntimeRenderer.vue"

const props = defineProps<{ row: Row, grid: GridComponent }>()

const isVisible = function (action: Action): boolean {
    if (action.isVisible) {
        return action.isVisible(props.row)
    }

    return true
}
</script>