<template>
    <div class="has-feedback has-feedback-left">
        <InputText
            v-if="! type"
            v-model="filterValue"
            @keyup.enter="search"
            @change="search"
            :disabled="disabled"
        />

        <InputDate :disabled="disabled" v-model="filterValue" @change="search()" v-if="isDate" :type="dateType"/>

        <select
            v-if="isType(GridSearchType.BOOLEAN)"
            v-model="filterValue"
            class="form-control pl-sm pr-sm"
            :disabled="disabled"
            @change="search()"
        >
            <option value=""></option>
            <option value="0">Não</option>
            <option value="1">Sim</option>
        </select>

        <el-select
            v-if="isType(GridSearchType.LIST)"
            v-model="filterValue"
            clearable
            :multiple="true"
            :disabled="disabled"
            class="multiple-select-form pr-sm"
            @change="search()"
        >
            <el-option :value="item.value" v-for="item in filterListValues" :label="item.label"/>
        </el-select>

        <div v-if="showSearchIcon" class="form-control-feedback">
            <i class="icon-search4 text-size-base"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import {computed, onMounted, onUnmounted, ref, watch} from "vue"
import {GridSearchType} from "../types/enum"
import {EventEmitter} from "../utils/EventEmitter";
import {SearchConfigListValue} from "@/types";

const filterValue = ref<any>(null)
const filterListValues = ref<SearchConfigListValue[]>([])

const emits = defineEmits(['change'])

const props = defineProps<{
    type?: GridSearchType,
    emitsEvents?: boolean,
    disabled?: boolean,
    searchConfig?: () => SearchConfigListValue[] | Promise<SearchConfigListValue[]>,
    uuid?: string,
    name?: string,
    modelValue?: any
}>()

watch(filterValue, (newValue: any) => {
    filterValue.value = _.isNumber(newValue) ? parseInt(newValue.toString()) : newValue
})

watch(() => props.modelValue, (newValue: any) => {
    filterValue.value = props.modelValue
})

const showSearchIcon = computed(() => {
    switch (props.type) {
        case GridSearchType.BOOLEAN:
        case GridSearchType.LIST:
        case GridSearchType.REMOTE:
        case GridSearchType.DATE:
        case GridSearchType.DATE_RANGE:
        case GridSearchType.DATE_MONTH:
        case GridSearchType.COMPONENT:
            return false
        default:
            return true
    }
})

const isDate = computed(() => isType(GridSearchType.DATE) || isType(GridSearchType.DATE_RANGE) || isType(GridSearchType.DATE_MONTH))

const dateType = computed(() => {
    switch (props.type) {
        case GridSearchType.DATE_RANGE:
            return "daterange"
        case GridSearchType.DATE_MONTH:
            return "month"
        default:
            return "date"
    }
})

const isType = (type: GridSearchType) => props.type === type

const search = () => {
    let value = filterValue.value

    if (isType(GridSearchType.DATE_RANGE) && !value) {
        value = []
    }

    emits('change', value)
}

const onGridFilterChangedEvent = (data: any) => {
    const {name, value, uuid} = data

    if (name === props.name && props.uuid === uuid) {
        filterValue.value = value
    }
}

const loadSearchConfig = async () => {
    if (props.searchConfig) {
        let promise: any = props.searchConfig();

        if (promise && typeof promise.then === 'function' && promise[Symbol.toStringTag] === 'Promise') {
            filterListValues.value = await promise
        } else {
            filterListValues.value = promise
        }
    }
}

onMounted(() => {
    if (props.emitsEvents) {
        EventEmitter.on("grid-filter", onGridFilterChangedEvent)
    }

    filterValue.value = props.modelValue
    loadSearchConfig()
})

onUnmounted(() => {
    if (props.emitsEvents) {
        EventEmitter.off("grid-filter", onGridFilterChangedEvent)
    }
})
</script>