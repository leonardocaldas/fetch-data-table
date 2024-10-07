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
import type {SparkGridConfig} from "..";

export default {
    computed: {
        grid(): SparkGridConfig {
            return {
                url: 'http://localhost:3000/countries.json',

                columns: [
                    {name: "id", label: "Id"},
                    {name: "name", label: "Country"},
                    {name: "iso3", label: "Iso3"},
                    {name: "iso2", label: "Iso2"},
                    {name: "numeric_code", label: "Numeric Code"},
                    {name: "phone_code", label: "Phone Cede"},
                    {name: "capital", label: "Capital"},
                    {name: "currency", label: "Currency"},
                ]
            }
        }
    }
} as Component
</script>

