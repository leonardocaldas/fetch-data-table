<template>
    <SparkGrid
        :config="grid"
    />
</template>

<style>
body {
    font-family: "Figtree", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

#app {
    padding: 20px;
}
</style>

<script lang="ts">
import {Component} from "@vue/runtime-core";
import type {Row, SparkGridConfig} from "..";
import {GridSearchType} from "../src";

export function pushSafe(obj, property, value): void {
    if (!obj[property]) {
        obj[property] = []
    }

    obj[property].push(value)
}

export function spliceSafe(obj, property, value) {
    if (!obj[property]) {
        obj[property] = []
    }

    let indexOf = obj[property].indexOf(value)

    if (indexOf !== -1) {
        obj[property].splice(indexOf, 1)
    }
}

export default {
    computed: {
        grid(): SparkGridConfig {
            return {
                url: 'http://localhost:3000/countries.json',

                onRowChecked: (row: Row) => pushSafe(this, "ids", row.id),
                onRowUnchecked: (row: Row) => spliceSafe(this, "ids", row.id),
                isRowChecked: (row: Row) => this.ids && this.ids.indexOf(row.id) !== -1,
                checkboxEnabled: true,

                columns: [
                    {name: "id", label: "Id"},
                    {name: "name", label: "Country"},
                    {name: "iso3", label: "Iso3"},
                    {name: "iso2", label: "Iso2"},
                    {name: "numeric_code", label: "Numeric Code"},
                    {name: "phone_code", label: "Phone Cede"},
                    {
                        name: "capital", label: "Capital", searchType: GridSearchType.LIST, searchConfig: async () => {
                            return [
                                {label: "Teste", value: "Teste 1"},
                                {label: "Teste 2", value: "Teste 2"}
                            ]
                        }
                    },
                    {name: "currency", label: "Currency"},
                ]
            }
        }
    },

    data() {
        return {
            ids: [1, 2, 3, 4],
        }
    }
} as Component
</script>

