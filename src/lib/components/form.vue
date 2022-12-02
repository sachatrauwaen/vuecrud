<template>
  <component :is="formLayout">
    <template #actions>
      <div v-if="actions && actions.length">
        <el-button
          v-for="action in actions"
          :key="action.name"
          size="small"
          :type="action.type"
          @click="action.execute(validate)"
          >{{ action.name }}</el-button
        >
      </div>
      <div v-if="customComponents && customComponents.length">
        <component v-for="(comp, index) in customComponents" :key="index" :is="comp" :model="model" ></component>
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
  </component>
</template>

<script>
import Vue from "vue";
import { default as Utils } from "../utils/utils";
import defaults from "../utils/defaults";
import FormLayout from "../../demo/FormLayout.vue";

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
    labelWidth: String,
  },
  data() {
    return {};
  },
  computed: {
    customComponents() {
      
      let comps = this.schema && this.schema["x-ui-components"];
      if (comps) {
        return comps.split(",").map((type) => {
          var compName = "oa-" + type;
          var comp = Vue.component(compName);
          if (!comp) {
            comp = (resolve, reject) => {
              Utils.loadComponent({
                name: compName,
                path: this.connector.componentsPath() + type + ".js",
                onLoad: resolve,
                onError: reject,
              });
            };
          }
          return comp;
        });
      } else {
        return [];
      }
    },
    formLayout() {
      var comp = Vue.component("oa-form-layout");
      if (comp) return comp;
      else return FormLayout;
    },
    properties() {
      return this.schema.properties;
    },
    fields() {
      if (this.options) {
        return this.options.fields;
      } else {
        var fields = {};
        for (var key in this.properties) {
          if (this.columns) {
            if (this.columns.indexOf(key) > 0) {
              fields[key] = this.property(key);
            }
          } else {
            if (
              key != "id" &&
              !this.property(key).readonly &&
                (!Object.prototype.hasOwnProperty.call(this.property(key),"x-ui-form") ||
                this.property(key)["x-ui-form"])
              /*&& !this.schema.properties[key]['x-rel-app']
              && !this.schema.properties[key]['x-rel-to-many-app']*/
            ) {
              fields[key] = this.property(key);
            }
          }
        }
        return fields;
      }
    },
    rules() {
      var rules = {};
      for (var key in this.properties) {
        let prop = this.property(key);
        let itemRules = [];
        if (prop.required && prop.type != "object") {
          itemRules.push({
            required: true,
            message: "Please input a value",
          });
          rules[key] = itemRules;
        }
        if (prop.format == 'email' ) {
          itemRules.push({
            type:'email',
            message: "Please input a email",
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
    labelWidthCalculated() {
      return defaults.labelWidth;
    },
  },
  methods: {
    property(key) {
      return Utils.jsonSchema.simplify(this.properties[key]);
    },
    validate(callback) {
      this.$refs.form.validate(function (valid) {
        if (callback) callback(valid);
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    clearValidate() {
      this.$refs.form.clearValidate();
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
