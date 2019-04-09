<template>
<el-form ref="form" :model="model" :rules="rules" label-width="120px" :label-position="labelPosition">
    <oa-fields :model="model" :schema="schema" :connector="connector" :messages="messages" :resource="resource" ></oa-fields>
    <el-form-item>
        <el-button v-for="action in actions" :key="action.name" size="small" :type="action.type" @click="action.execute(validate)">{{action.name}}</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import { default as Utils } from "../utils/utils";
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
        customLabelPosition: String // Optional
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
                        message: "Please input a value"
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
                        message: "Please input a value"
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
            if(this.customLabelPosition != null && this.customLabelPosition != '')
                return this.customLabelPosition;
                
            return this.isMobile ? "top" : "right";
        }
    },
    methods: {
        validate(callback) {
            this.$refs.form.validate(function(valid) {
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
        }
    }
};
</script>
