<template>
        <el-date-picker v-model="model" type="date" 
        format="dd/MM/yyyy" value-format="yyyy-MM-dd" 
        :picker-options="{firstDayOfWeek: 1}" :disabled="disabled" ></el-date-picker>
</template>
<script>
export default {
    name: "oa-date",
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
        disabled(){
             return this.schema["x-ui-disabled"];
        }
    }
};
</script>