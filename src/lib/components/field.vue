<template>
    <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
        <component v-bind:is="currentView" v-model="model" v-bind="$props" @propChange="propChange"></component>
    </el-form-item>
</template>

<script>
//import Vue from "vue";
import { default as Utils } from "../utils/utils";
import { components } from "../utils/install";

export default {
    name: "oa-field",
    template: " ",
    props: {
        value: {},
        schema: {},
        prop: {
            type: String,
            default: function() {
                return "";
            }
        },
        messages: {
            type: Object,
            default: function() {
                return {};
            }
        },
        connector: {},
        resource: String
    },

    computed: {
        currentView() {
            var sch = Utils.jsonSchema.getNotNull(this.schema);

            var type = Array.isArray(sch.type)
                ? sch.type[0] == "null"
                    ? sch.type[1]
                    : sch.type[0]
                : sch.type;

            var comp = sch["x-type"]
                ? null // Special case, we will resolve async
                : sch["x-rel-action"]
                ? components.Relation
                : sch["x-rel-to-many-action"]
                ? components.RelationToMany
                : sch.enum || sch["x-enum-action"]
                ? type == "array"
                    ? components.CheckboxGroup
                    : components.Select
                : type == "boolean"
                ? components.Switch
                : type == "integer" || type == "number"
                ? components.Inputnumber
                : type == "array" && this.schema.items.format == "date-time"
                ? components.Daterange
                : sch.format == "date-time"
                ? components.Datetime
                : sch["x-ui-multiline"]
                ? components.Textarea
                : type == "address"
                ? components.Address
                : type == "object"
                ? components.Fields
                : components.Input; // Default to input

            // Special case
            if (sch["x-type"]) {
                // X-type should only be used for unknown components, and thus resolved async
                type = sch["x-type"];
                var compName = "oa-" + type;
                comp = (resolve, reject) => {
                    Utils.loadComponent({
                        name: compName,
                        path: this.connector.componentsPath() + type + ".js",
                        onLoad: resolve,
                        onError: reject
                    });
                };
            }

            // if (sch["x-type"]) {
            //   type = sch["x-type"];
            // } else if (sch["x-rel-action"]) {
            //   type = "relation";
            // } else if (sch["x-rel-to-many-action"]) {
            //   type = "relation-to-many";
            // } else if (sch.enum || sch["x-enum-action"]) {
            //   if (type == "array") {
            //     type = "checkbox-group";
            //   } else {
            //     type = "select";
            //   }
            // } else if (type == "boolean") {
            //   type = "switch";
            // } else if (type == "integer" || type == "number") {
            //   type = "inputnumber";
            // } else if (type == "array" && this.schema.items.format == "date-time") {
            //   type = "daterange";
            // } else if (sch.format == "date-time") {
            //   type = "datetime";
            // } else if (sch["x-ui-multiline"]) {
            //   type = "textarea";
            // } else if (type == "address") {
            //   type = "address";
            // } else if (type == "array") {
            //   type = "list";
            // } else if (type == "object") {
            //   type = "fields";
            // } else {
            //   type = "input";
            // }

            // var compName = "oa-" + type;
            // var comp = Vue.component(compName);

            // if (!comp) {
            //   // try to find the requested component in the dist/ folder, and load dynamicly
            //   comp = (resolve, reject) => {
            //     Utils.loadComponent({
            //       name: compName,
            //       path: this.connector.componentsPath() + type + ".js",
            //       onLoad: resolve,
            //       onError: reject
            //     });
            //   };
            // }

            return comp;
        },

        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },

        label() {
            if (this.hideLabel) return "";
            var name = this.schema.title
                ? this.schema.title
                : Utils.capitalize(this.prop);
            if (this.messages && this.messages[name])
                return this.messages[name];
            else return this.schema.title ? this.schema.title : name;
        },
        hideLabel() {
            return this.schema["x-ui-hideLabel"];
        },
        labelWidth: function() {
            return this.hideLabel ? "0px" : undefined;
        }
    },
    methods: {
        propChange(key, value) {
            this.$emit("propChange", key, value);
        }
    }
};
</script>
