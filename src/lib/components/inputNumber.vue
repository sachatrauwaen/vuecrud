<template>
    <el-input-number v-model="model" v-bind="inputProps" :disabled="disabled"></el-input-number>
</template>

<script>
export default {
    name: "oa-inputnumber",

    props: {
        value: Number,
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
        inputProps(){
            var p= {};
            if (this.schema["x-ui-precision"]) {
                p.precision = this.schema["x-ui-precision"];
            }
            if (this.schema["x-ui-min"]) {
                p.min = this.schema["x-ui-min"];
            }
            if (this.schema["x-ui-max"]) {
                p.max = this.schema["x-ui-max"];
            }
            if (this.schema["x-ui-step"]) {
                p.step = this.schema["x-ui-step"];
            }
            return p;
        },
        disabled(){
             return this.schema["x-ui-disabled"];
        }
    }
};
</script>
