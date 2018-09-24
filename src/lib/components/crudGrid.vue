<template>
<div>
    <oa-crud-grid-without-router
        :module="module"
        :resource="resource"
        :connector="connector"
        :doOnEdit="onEdit"
        :doOnAdd="onAdd">
    </oa-crud-grid-without-router>
</div>
</template>

<script>
export default {
  name: "oa-crud-grid",
  data: function() {
    return {};
  },
  computed: {
      module () {
          return this.$route.params.module;
      },
      resource () {
          return this.$route.params.resource;
      },
      connector () {
          return this.$root.$options.connector;
      },
  },
  methods: {
    onEdit (row) {
      this.$router.push({
        name: "edit",
        params: {
          resource: this.resource,
          id: row.id
        }
      });
    },
    onAdd () {
      this.$router.push({
        name: "add",
        params: {
          resource: this.resource
        }
      });
    },
  },
  created() {},
  watch: {}
};
</script>
























const onEdit = (row) => {
  this.$router.push({
    name: "edit",
    params: {
      resource: this.resource,
      id: row.id
    }
  });
};

const onAdd =  () => {
  this.$router.push({
    name: "add",
    params: {
      resource: this.resource
    }
  });
};