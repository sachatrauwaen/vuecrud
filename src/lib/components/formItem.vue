<template>
    <el-form-item :label="label" :prop="prop">
        <slot></slot>
        <slot name="footer"></slot>
    </el-form-item>
</template>

<script>
export default {
    name: "oa-form-item",
    props: {
        label: {},
        prop: String,
        messages: Object
    },
    components: {},
    computed: {},
    methods: {}
};
</script>
