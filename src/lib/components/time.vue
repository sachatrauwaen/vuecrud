<template>
    <el-time-select v-model="model" :picker-options="{start: start, step: step, end: end }" :disabled="disabled"></el-time-select>
</template>

<script>
export default {
    name: "oa-time",

    props: {
        value: {},
        schema: {},
        prop: String,
        options: {}
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },
        start() {
            return this.schema["x-ui-start"]
                ? this.schema["x-ui-start"]
                : "00:00";
        },
        step() {
            return this.schema["x-ui-step"]
                ? this.schema["x-ui-step"]
                : "00:30";
        },
        end() {
            return this.schema["x-ui-end"] ? this.schema["x-ui-end"] : "23:30";
        },
        disabled(){
             return this.schema["x-ui-disabled"];
        }
    }
};
</script>
