<template>
<el-checkbox-group v-model="model">
    <el-checkbox v-for="item in options" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
</el-checkbox-group>
</template>

<script>
export default {
  name: "oa-checkbox-group",
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    schema: {},
    prop: String,
    connector: {},
    resource: String,
  },
  data() {
    return {
      options: []
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }    
  },
  created() {
    var enumAction = this.schema["x-enum-action"];
    if (enumAction) {
      var enumValueField = this.schema["x-enum-valuefield"];
      var enumTextField = this.schema["x-enum-textfield"] || this.schema["x-enum-valuefield"];
      this.connector
        .pService(this.resource, enumAction, {})
        .then(data => {
          this.options = data.items.map(p => ({
              value: p[enumValueField],
              label: p[enumTextField]
          }))
        });     
    } else if (this.schema.enum) {
      this.options = this.schema.enum.map(function(val) {
        return {
          value: val,
          label: val
        };
      });
    } else {
      return [];
    }
  }
};
</script>
