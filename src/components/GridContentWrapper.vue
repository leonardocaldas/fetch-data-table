<template>
    <div class="spark-grid grid-wrapper">
        <div class="spark-grid-body" :style="styles" :class="classes">
            <slot name="main"></slot>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts">
import type {GridComponent} from "../types/types"
import {computed} from "vue"

const props = defineProps<{ grid: GridComponent }>()

const classes = computed(() => {
    let classes = []

    if (props.grid.config.stickyHeaderEnabled) {
        classes.push("grid-sticky-header")
    }

    return classes.join(" ")
})

const styles = computed(() => {
    let styles: any = {
        background: '#fafafa'
    }

    if (props.grid.config.overflowEnabled) {
        const maxHeight = props.grid.config.height ?? (window.innerHeight - 100)

        styles['overflow-x'] = 'auto'
        styles['max-height'] = `${maxHeight}px`
        styles['min-height'] = `${maxHeight}px`

        if (props.grid.config.stickyHeaderEnabled) {
            styles['position'] = 'relative'
        }
    }

    return styles
})
</script>

<style>

</style>