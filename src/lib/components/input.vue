<template>
    <el-input v-model="model" :disabled="disabled"></el-input>
</template>

<script>
export default {
    name: "oa-input",
    props: {
        value: String,
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
    }
};
</script>
