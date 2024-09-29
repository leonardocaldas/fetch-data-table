<template>
    <DynaGrid
        :config="grid"
    />
</template>

<style scoped>
#app {
    padding: 20px;
}
</style>

<script lang="ts">
import {Component} from "@vue/runtime-core";
import type {SparkGridConfig} from "../src/definition/types";

export default {
    computed: {
        grid(): SparkGridConfig {
            return {
                datasource: (params: any) => {
                    return [
                        {id: 1, name: "John Doe"},
                    ]
                },

                columns: [
                    {name: "id", label: "ID"}
                ]
            }
        }
    }
} as Component
</script>

