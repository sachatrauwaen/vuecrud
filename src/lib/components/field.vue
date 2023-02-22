<template>
    <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
        <span slot="label">
            {{label}}
            <el-tooltip v-if="tooltip" :content="tooltip" >                
                <i class="el-icon-info"></i>
            </el-tooltip>
        </span>
        <component v-bind:is="currentView" v-model="model" :model="value" v-bind="$props" @propChange="propChange" :resource="resource" :parent-model="parentModel"></component>
    </el-form-item>
</template>

<script>
import Vue from "vue";
import { default as Utils } from "../utils/utils";
import { components } from "../utils/install";
import defaults from '../utils/defaults'

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
        resource: String,
        parentModel: {},
        readOnly: Boolean
    },

    computed: {
        currentView() {
            var sch = Utils.jsonSchema.getNotNull(this.schema);

            var type = Array.isArray(sch.type)
                ? sch.type[0] == "null"
                    ? sch.type[1]
                    : sch.type[0]
                : sch.type;

            let comp = null;
            if (sch["x-type"]){            
                type = sch["x-type"];
                var compName = "oa-" + type;                
                comp = Vue.component(compName);
                if (!comp) {
                    comp = (resolve, reject) => {
                        Utils.loadComponent({
                            name: compName,
                            path: this.connector.componentsPath() + type + ".js",
                            onLoad: resolve,
                            onError: reject
                        });
                    };    
                }
                return comp;
            } else if (this.readOnly) {
                comp = 
                    sch.enum
                    ? components.ViewEnum // (type == "array" ? components.ViewEnumArray : components.ViewEnum)
                    : type == "boolean"
                        ? components.ViewBoolean
                    //: type == "integer" || type == "number"
                    //    ? components.ViewNumber
                    //: type == "array" && this.schema.items.format == "date-time"
                    //    ? components.Daterange
                    //: sch.format == "date-time"
                    //    ? components.ViewDatetime
                    //: sch["x-ui-multiline"]
                    //    ? components.ViewTextarea
                    : type == "array"
                        ? components.List
                    : type == "object"
                        ? components.Fields
                        : components.ViewText; 

                return comp;
            } else {
                comp = 
                    sch["x-rel-action"]
                        ? components.Relation
                    : sch["x-rel-to-many-action"]
                        ? components.RelationToMany
                    : sch.enum || sch["x-enum-action"]
                        ? (type == "array" ? components.CheckboxGroup : components.Select)
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
                    : type == "array"
                        ? components.List
                    : type == "object"
                        ? components.Fields
                        : components.Input; // Default to input

                return comp;
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
        tooltip() {
            if (this.hideLabel) return "";            
            if (this.messages && this.messages[this.schema.description])
                return this.messages[this.schema.description];
            else return this.schema.description;
        },
        hideLabel() {
            return this.schema["x-ui-hideLabel"];
        },
        lw() {
            return this.schema["x-ui-labelWidth"];
        },
        labelWidth: function() {
            return this.hideLabel ? "0px" : (this.lw ? this.lw : defaults.labelWidth);
        }
    },
    methods: {
        propChange(key, value) {
            this.$emit("propChange", key, value);
        }
    }
};
</script>
