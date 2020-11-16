<template>
  <el-select v-model="model" placeholder="Select">
    <el-option v-if="!hideNone" :label="noneLabel" :value="noneValue"></el-option>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "oa-select",
  props: {
    value: {},
    schema: {},
    messages: Object,
    resource: String,
    prop: String,
    connector: {},
    parentModel: {}
  },
  data() {
    return {
      options: [],
      hideNone: false,
      noneLabel: "None",
      noneValue: undefined
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
    },
    enumCascade() {
      return this.schema["x-enum-cascade"];
    }
  },
  methods: {
    generateOptions(newParentModel) {
      let req = {};

      if (newParentModel && newParentModel.model) {
        req = Object.assign(req, this.parentModel.model);
        if (this.parentModel.model) {
          req.parent = this.parentModel.parent;
        }
      }

      const sch =
        this.schema.oneOf && this.schema.oneOf[0]
          ? this.schema.oneOf[0]
          : this.schema;

      if (sch["x-enum-action"]) {
        var enumAction = this.schema["x-enum-action"];
        var enumValueField = this.schema["x-enum-valuefield"] || "id";
        var enumTextField = this.schema["x-enum-textfield"] || "fullName";
        this.connector.service(
          this.resource,
          enumAction,
          req,
          data => {
            this.options = data.map(p => ({
              value: p[enumValueField],
              label: p[enumTextField]
            }));
          },
          () => {}
        );
      }
    }
  },
  created() {
    const sch =
      this.schema.oneOf && this.schema.oneOf[0]
        ? this.schema.oneOf[0]
        : this.schema;
    if (sch.enum) {
      for (var i = 0; i < sch.enum.length; i++) {
        let label = sch["x-enumNames"]
          ? sch["x-enumNames"][i]
          : this.prop + "_" + sch.enum[i];
        if (this.messages && this.messages[label]) {
          label = this.messages[label];
        }
        this.options.push({
          value: sch.enum[i],
          label: label
        });
      }
    } else if (sch["x-enum-action"]) {
      this.generateOptions(this.parentModel);
    }
    if (sch["x-enum-nonelabel"]) {
      this.noneLabel = sch["x-enum-nonelabel"];
      if (this.messages && this.messages[this.noneLabel]) {
        this.noneLabel = this.messages[this.noneLabel];
      }
    }
    if (sch["x-enum-hideNone"]) {
      this.hideNone = sch["x-enum-hideNone"];
    }
    if (sch["default"]) {
      this.model = sch["default"];
    }
    if (this.enumCascade) {
      this.$watch(
        "parentModel",
        function(newVal) {
          this.generateOptions(newVal);
        },
        {
          deep: true
        }
      );
    }
  }
};
</script>
