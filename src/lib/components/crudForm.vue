<template>
    <oa-crud-form-without-router
        :resource="resource"
        :redirect="redirect"
        :module="module"
        :id="id"
    ></oa-crud-form-without-router>
</template>

<script>
export default {
    name: "oa-crud-form",
    props: {},
    data() {
        return {};
    },
    computed: {
        resource() {
            return this.$route.params.resource;
        },
        module() {
            return this.$route.params.module;
        },
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        redirect() {
            this.$router.go(-1);
        }
    },
    created() {},
    watch: {
        //todo '$route': 'fetchData'
    }
};
</script>