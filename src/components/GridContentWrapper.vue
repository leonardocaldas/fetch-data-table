<template>
    <div class="grid-wrapper" :style="styles" :class="classes">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type {GridComponent} from "../definition/types"
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
        styles['overflow-x'] = 'auto'
        styles['max-height'] = `${props.grid.config.height ?? window.innerHeight}px`
        styles['min-height'] = `${props.grid.config.height ?? window.innerHeight}px`

        if (props.grid.config.stickyHeaderEnabled) {
            styles['position'] = 'relative'
        }
    }

    return styles
})
</script>

<style>

</style>