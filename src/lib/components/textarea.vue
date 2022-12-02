<template>
    <el-input type="textarea" autosize v-model="model" :disabled="disabled" :rows="3"></el-input>
</template>

<script>
export default {
    name: "oa-textarea",

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
