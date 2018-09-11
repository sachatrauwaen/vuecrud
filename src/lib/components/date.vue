<template>
        <el-date-picker v-model="model" type="date" format="dd/MM/yyyy" ></el-date-picker>
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
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>