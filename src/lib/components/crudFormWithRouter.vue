<template>
    <oa-crud-form
      :resource="resource"
      :redirect="redirect">
    </oa-crud-form>
</template>

<script>
    export default {
        name: 'oa-crud-form-with-router',
        props: {},
        data: function () {
            return {};
        },
        computed: {
            resource: function () {
                return this.$route.params.resource;
            }
        },
        methods: {
            redirect: function () {
                this.$router.go(-1);
            }
        },
        created: function () { },
        watch: {}
    };
</script>