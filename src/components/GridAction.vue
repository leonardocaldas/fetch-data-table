<template>
    <td :style='width' class="text-center">
    <span v-for="(action, i) in actions">
      <button
          :disabled="disabled"
          type="button"
          :key="i"
          :title="action.title || ''"
          v-show="shouldShow(action, row)"
          @click="action.action(Object.assign({}, row))"
          :class="getButtonClasses(action)">
        <b v-if="action.buttonType === 'labeled'"><i :class="action.icon"></i></b>
        <i :class="action.icon" v-else></i>

        {{ action.buttonLabel || "" }}
      </button>
    </span>
    </td>
</template>

<script>
export default {
    name: "grid-action",

    props: {
        actions: {
            type    : Array,
            required: true
        },

        row: {
            type    : Object,
            required: true
        },

        width: {
            type    : String,
            required: true
        },

        disabled: {
            type    : Boolean,
            required: false,
            default : false
        }
    },

    methods: {
        shouldShow(action, row) {
            if (typeof action.showWhen === "function") {
                return action.showWhen(row);
            }

            return true;
        },

        getButtonClasses(action) {
            const btnClasses = action.buttonType === "labeled" ? "btn-labeled" : "btn-xs btn-icon btn-flat action-icon";
            return `btn btn-sm ${action.class} ${btnClasses}`;
        }
    }
};
</script>