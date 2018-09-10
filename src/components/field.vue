<template>
<el-form-item :label="label" :prop="prop" :label-width="labelWidth">
    <component v-bind:is="currentView" v-model="model" v-bind="$props" @propChange="propChange"></component>
</el-form-item>
</template>

<script>
import Vue from "vue";
import VueForms from "../vueforms";

export default {
  name: "oa-field",
  template: " ",
  props: {
    value: {},
    schema: {},
    prop: {
      type:String,
      default:function () {
        return "";
      }
    },
    messages: {
      type:Object,
      default: function (){
        return {};
      }
    },
    connector: {},
    resource: {}
  },

  computed: {
    currentView: function() {
      var sch = VueForms.jsonSchema.getNotNull(this.schema);

      var type = Array.isArray(sch.type)
        ? sch.type[0] == "null" ? sch.type[1] : sch.type[0]
        : sch.type;

      if (sch["x-type"]) {
        type = sch["x-type"];
      } else if (sch["x-rel-action"]) {
        type = "relation";
      } else if (sch["x-rel-to-many-action"]) {
        type = "relation-to-many";
      } else if (sch.enum || sch["x-enum-action"]) {
        if (type == "array") {
          type = "checkbox-group";
        } else {
          type = "select";
        }
      } else if (type == "boolean") {
        type = "switch";
      } else if (type == "integer" || type == "number") {
        type = "inputnumber";
      } else if (type == "array" && this.schema.items.format == "date-time") {
        type = "daterange";
      } else if (sch.format == "date-time") {
        type = "datetime";
      } else if (sch["x-ui-multiline"]) {
        type = "textarea";
      } else if (type == "address") {
        type = "address";
      } else if (type == "array") {  
        type = "list";
      } else {
        type = "input";
      }

      var compName = "oa-" + type;

      var comp = Vue.component(compName);
      //var comp = VueCrud.components[compName];

      if (!comp) {
        comp = function(resolve, reject) {
          Vue.$loadComponent({
            name: compName,
            path: this.connector.componentsPath + type + ".js",
            onLoad: resolve,
            onError: reject
          });
        };
      }

      return comp;
    },

    model: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit("input", val);
      }
    },

    label: function() {
      if (this.hideLabel) return "";
      var name = this.schema.title ? this.schema.title : this.prop.capitalize();
      if (this.messages && this.messages[name]) return this.messages[name];
      else return this.schema.title ? this.schema.title : name;
    },
    hideLabel: function() {
      return this.schema["x-ui-hideLabel"];
    },
    labelWidth: function() {
      return this.hideLabel ? "0px" : "120px";
    }
  },

  methods: {
    propChange: function(key, value) {
      this.$emit("propChange", key, value);
    }
  }
};
</script>
