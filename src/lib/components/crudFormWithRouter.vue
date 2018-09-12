<template>
    <oa-crud-form
      :resource="resource"
      :redirect="redirect"
      :module="module"
      :id="id">
    </oa-crud-form>
</template>

<script>
    export default {
        name: 'oa-crud-form-with-router',
        props: {},
        data () {
            return {};
        },
        computed: {
            resource () {
                return this.$route.params.resource;
            },
            module () {
                return this.$route.params.module
            },
            id () {
                return this.$route.params.id
            },
        },
        methods: {
            redirect () {
                this.$router.go(-1);
            }
        },
        created () { },
        watch: {}
    };
</script>