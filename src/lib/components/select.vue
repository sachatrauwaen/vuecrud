<template>
  <el-select
    v-model="model"
    placeholder="Select"
    :filterable="filterable"
    :disabled="disabled"
  >
    <el-option
      v-if="!hideNone"
      :label="noneLabel"
      :value="noneValue"
    ></el-option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { default as Utils } from "../utils/utils";

export default {
  name: "oa-select",
  props: {
    value: {},
    schema: {},
    messages: Object,
    resource: String,
    prop: String,
    connector: {},
    parentModel: {},
  },
  data() {
    return {
      options: [],
      hideNone: false,
      noneLabel: "None",
      noneValue: undefined,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    enumCascade() {
      return this.sch["x-enum-cascade"];
    },
    filterable() {
      return this.sch["x-enum-filterable"];
    },
    disabled() {
      return this.sch["x-ui-disabled"];
    },
    sch(){
      return Utils.jsonSchema.getNotNull(this.schema);
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
      
      // const sch =
      //   this.schema.oneOf && this.schema.oneOf[0]
      //     ? this.schema.oneOf[0]
      //     : this.schema;

      if (this.sch["x-enum-action"]) {
        var enumAction = this.sch["x-enum-action"];
        var enumValueField = this.sch["x-enum-valuefield"] || "id";
        var enumTextField = this.sch["x-enum-textfield"] || "fullName";
        this.connector.service(
          this.resource,
          enumAction,
          req,
          (data) => {
            this.options = data.map((p) => ({
              value: p[enumValueField],
              label: p[enumTextField],
            }));
          },
          () => {}
        );
      }
    },
  },
  created() {
    // const sch =
    //   this.schema.oneOf && this.schema.oneOf[0]
    //     ? this.schema.oneOf[0]
    //     : this.schema;
    if (this.sch.enum) {
      for (var i = 0; i < this.sch.enum.length; i++) {
        let label = this.sch["x-enumNames"]
          ? this.sch["x-enumNames"][i]
          : this.prop + "_" + this.sch.enum[i];
        if (this.messages && this.messages[label]) {
          label = this.messages[label];
        }
        this.options.push({
          value: this.sch.enum[i],
          label: label,
        });
      }
    } else if (this.sch["x-enum-action"]) {
      this.generateOptions(this.parentModel);
    }
    if (this.sch["x-enum-nonelabel"]) {
      this.noneLabel = this.sch["x-enum-nonelabel"];
      if (this.messages && this.messages[this.noneLabel]) {
        this.noneLabel = this.messages[this.noneLabel];
      }
    }
    if (this.sch["x-enum-hideNone"]) {
      this.hideNone = this.sch["x-enum-hideNone"];
    }
    if (this.sch["default"]) {
      this.model = this.sch["default"];
    }
    if (this.enumCascade) {
      this.$watch(
        "parentModel",
        function (newVal) {
          this.generateOptions(newVal);
        },
        {
          deep: true,
        }
      );
    }
  },
};
</script>
