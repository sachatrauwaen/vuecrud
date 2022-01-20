<template>
    <el-switch v-model="model" on-text off-text :disabled="disabled"></el-switch>
</template>

<script>
export default {
    name: "oa-switch",

    props: {
        value: Boolean,
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
        disabled(){
             return this.schema["x-ui-disabled"];
        }
    }, 
    created(){
        if (this.schema["default"]) {
            this.model = this.schema["default"];
        }
    }
};
</script>
