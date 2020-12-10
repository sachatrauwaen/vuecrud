<template>
  <oa-form-layout>
    <template #actions>
      <div v-if="actions && actions.length">
        <el-button
          v-for="action in actions"
          :key="action.name"
          size="small"
          :type="action.type"
          @click="action.execute(validate)"
        >{{action.name}}</el-button>
      </div>
    </template>
    <template #languages>
      <el-select
        v-if="isMultiLingual"
        :value="language"
        placeholder="Language"
        @change="changeLanguage"
        size="small"
      >
        <el-option
          v-for="item in languages"
          :key="item.name"
          :label="item.displayName"
          :value="item.name"
        ></el-option>
      </el-select>
    </template>
    <el-form
      ref="form"
      :model="model"
      :rules="rules"
      :label-width="labelWidthCalculated"
      :label-position="labelPosition"
    >
      <oa-fields
        :model="model"
        :schema="schema"
        :connector="connector"
        :messages="messages"
        :resource="resource"
      ></oa-fields>
    </el-form>
  </oa-form-layout>
</template>

<script>
import { default as Utils } from "../utils/utils";
import defaults from '../utils/defaults'

export default {
  name: "oa-form",
  props: {
    model: {},
    schema: {},
    options: {},
    messages: {},
    actions: {},
    columns: {},
    connector: {},
    resource: String,
    customLabelPosition: String, // Optional,
    language: String,
    labelWidth: String
  },
  data() {
    return {};
  },
  computed: {
    properties() {
      return this.schema.properties;
    },
    fields() {
      if (this.options) {
        return this.options.fields;
      } else {
        var fields = {};
        for (var key in this.schema.properties) {
          if (this.columns) {
            if (this.columns.indexOf(key) > 0) {
              fields[key] = this.schema.properties[key];
            }
          } else {
            if (
              key != "id" &&
              !this.schema.properties[key].readonly
              /*&& !this.schema.properties[key]['x-rel-app']
              && !this.schema.properties[key]['x-rel-to-many-app']*/
            ) {
              fields[key] = this.schema.properties[key];
            }
          }
        }
        return fields;
      }
    },
    rules() {
      var rules = {};
      for (var key in this.schema.properties) {
        let prop = this.schema.properties[key];
        let itemRules = [];
        if (prop.required && prop.type != "object") {
          itemRules.push({
            required: true,
            message: "Please input a value",
          });
          rules[key] = itemRules;
        }
      }
      if (this.schema.required) {
        for (var i = 0; i < this.schema.required.length; i++) {
          let prop = this.schema.required[i];
          let itemRules = rules[prop];
          if (!itemRules) {
            itemRules = [];
            rules[prop] = itemRules;
          }
          if (!itemRules) {
            itemRules = [];
            rules[key] = itemRules;
          }
          itemRules.push({
            required: true,
            message: "Please input a value",
          });
        }
      }
      return rules;
    },
    tabs() {
      var groups = {};
      for (var key in this.fields) {
        var el = this.fields[key];
        var group = el["x-ui-group"];
        if (group in groups == false) {
          groups[group] = {};
        }
        groups[group][key] = el;
      }
      return groups;
    },
    isMobile() {
      return Utils.isMobile(window);
    },
    labelPosition() {
      if (this.customLabelPosition != null && this.customLabelPosition != "")
        return this.customLabelPosition;

      return this.isMobile ? "top" : "right";
    },
    locale() {
      return this.connector.locale();
    },
    languages() {
      return this.connector.languages();
    },
    isMultiLingual() {
      return this.schema && this.schema["x-multi-language"];
    },
    labelWidthCalculated(){
      return defaults.labelWidth;
    }
  },
  methods: {
    validate(callback) {
      this.$refs.form.validate(function (valid) {
        if (callback) callback(valid);
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    label(name) {
      if (this.messages && this.messages[name]) {
        return this.messages[name];
      } else {
        return name;
      }
    },
    propChange(key, value) {
      this.$set(this.model, key, value);
    },
    changeLanguage(language) {
      this.$emit("changeLanguage", language);
    },
  },
};
</script>
