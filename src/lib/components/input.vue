<template>
    <el-input v-model="model" :disabled="disabled" :maxlength="maxlength"></el-input>
</template>

<script>
export default {
    name: "oa-input",
    props: {
        value: String,
        schema: {},
        prop: String,
        options: {},
        parentModel: {},
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
        },
        maxlength(){
            return this.schema["maxLength"];
        }
    }
};
</script>
