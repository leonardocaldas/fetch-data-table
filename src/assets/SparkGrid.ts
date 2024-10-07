import GridSearchRow from "../components/GridSearchRow.vue"
import GridFooter from "../components/GridFooter.vue"
import GridHeader from "../components/GridHeader.vue"
import GridBody from "../components/GridBody.vue"
import GridContentWrapper from "../components/GridContentWrapper.vue"
import GridSummarizer from "../components/GridSummarizer.vue"
import type {Component} from "@vue/runtime-core"
import type {Props, SparkGridConfig} from "../types"
import {DataFetcher} from "../utils/DataFetcher"
import {EventHandler} from "../utils/EventHandler"
// @ts-ignore
import {v4 as uuidV4} from "uuid"

export default {
    emits: ['mounted'],
    props: ['config'],
    name: "SparkGrid",

    components: {
        GridFooter,
        GridSearchRow,
        GridSummarizer,
        GridContentWrapper,
        GridHeader,
        GridBody,
    },

    data(): object {
        return {
            uuid: uuidV4(),
            orderBy: null,
            filters: {},
            loading: false,
            currentPage: 1,
            totalRows: 0,
            rows: [],
            focusedCell: null,
            rowsPerPage: 10,
        }
    },

    methods: {
        fetch: DataFetcher.fetch,
        refresh: EventHandler.refresh,
        setRows: EventHandler.setRows,
        getRows: EventHandler.getRows,
        getCheckedRows: EventHandler.getCheckedRows,
        clearCheckedRows: EventHandler.clearCheckedRows,
        getColumns: EventHandler.getColumns,
        setFilter: EventHandler.setFilter,
        setFilters: EventHandler.setFilters,
        applyFilter: EventHandler.applyFilter,
        applyOrderBy: EventHandler.applyOrderBy,
        paginate: EventHandler.paginate,
        getSummarizedValue: EventHandler.getSummarizedValue,
        getSelectedRadioRow: EventHandler.getSelectedRadioRow,
        setSelectedRadioRow: EventHandler.setSelectedRadioRow,
        clearRadioRowSelection: EventHandler.clearRadioRowSelection,
    },

    computed: {
        grid(): Component<Props> {
            return this
        }
    },

    mounted() {
        this.$emit('mounted', this)

        const config: SparkGridConfig = this.config

        if (config.sendRequestOnMounted !== false) {
            this.refresh()
        }

        this.rowsPerPage = config.rowsPerPage ?? this.rowsPerPage
    }
} as Component<Props>