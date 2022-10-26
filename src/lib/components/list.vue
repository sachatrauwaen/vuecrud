<template>
<div>
    <el-table ref="table" v-if="!isMobile" :data="model" @row-click="rowClick" style="width: 100%" :row-style="{cursor: 'pointer'}">
        <el-table-column type="expand">
            <template slot-scope="props">
                <oa-fields :model="props.row" :schema="rowSchema" :connector="connector" :messages="messages" :resource="resource" :parent-model="parentModel"></oa-fields>
            </template>
        </el-table-column>
        <el-table-column v-for="(value, key) in columns" :key="key" :prop="key" :label="label(key)" :formatter="formatter" class-name="crudcell"></el-table-column>
        <el-table-column align="right" min-width="120px">
            <template slot-scope="scope">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" @click="action.execute(scope.row, scope.$index)"></el-button>
            </template>
        </el-table-column>
        <template slot="append">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addRow()" style="margin:10px auto;display:block"></el-button>
        </template>
    </el-table>
    <template v-else>
        <el-card  style="margin-bottom:10px;" v-for="row in model" :key="row.id">
            <oa-fields :model="row" :schema="rowSchema" :connector="connector" :messages="messages" :resource="resource" :parent-model="parentModel"></oa-fields>
            <div style="padding-top:10px;">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" @click="action.execute(row)"></el-button>
            </div>
        </el-card>
        <div style="padding-top:10px;">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addRow()" style="margin:10px auto;display:block"></el-button>
        </div>
    </template>
</div>
</template>

<script>
import Vue from 'vue'
import { default as Utils } from "../utils/utils";

export default {
    name: "oa-list",
    props: {
        value: {},
        schema: {},
        messages: Object,
        resource: String,
        prop: String,
        connector: {},
        parentModel:{}
    },
    data() {
        return {
            actions: [
                {
                    name: this.translate("Delete"),
                    icon: "el-icon-delete",
                    execute: row => {
                        var index = this.model.indexOf(row);
                        if (index > -1) {
                            this.model.splice(index, 1);
                        }
                    }
                },
                {
                    name: this.translate("Duplicate"),
                    icon: "el-icon-plus",
                    execute: row => {
                        var clone = JSON.parse(JSON.stringify(row));
                        if (Object.prototype.hasOwnProperty.call(clone,"id")) {
                            delete clone.id;
                        }
                        this.model.push(clone);
                    }
                }
            ]
        };
    },
    computed: {
        locale() {
            return this.connector.locale();
        },
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },
        rowSchema() {
            return Utils.jsonSchema.simplify(this.schema).items;
        },
        columns() {
            var fields = {};
            var sch = this.rowSchema;
            for (var key in sch.properties) {
                if (
                    key != "id" &&
                    this.property(key).type != "array" &&
                    (!Object.prototype.hasOwnProperty.call(this.property(key),"x-ui-grid") ||
                        this.property(key)["x-ui-grid"])
                ) {
                    fields[key] = this.property(key);
                }
            }
            return fields;
        },
        isMobile() {
            return Utils.isMobile(window);
        }
    },
    created() {},
    methods: {
        property(key){
            return Utils.jsonSchema.simplify(this.rowSchema.properties[key]);
        },
        translate(text) {
            if (this.messages && this.messages[text])
                return this.messages[text];
            else return text;
        },
        label(prop) {
            var sch = this.rowSchema;
            var name = sch.properties[prop].title
                ? sch.properties[prop].title
                : Utils.capitalize(prop);
            if (this.messages && this.messages[name])
                return this.messages[name];
            else return name;
        },
        formatter(row, column, cellValue) {
            var schema = Utils.jsonSchema.getNotNull(
                this.property(column.property)
            );
            if (schema.type == "boolean") {
                return cellValue ? this.messages["Yes"] : this.messages["No"];
            } else if (schema["x-type"] == "date") {
                if (!cellValue) return "";
                // eslint-disable-next-line
                return moment(cellValue)
                    .locale(this.locale)
                    .format("L");
            } else if (schema.format == "date-time") {
                if (!cellValue) return "";
                // eslint-disable-next-line
                return moment(cellValue)
                    .locale("fr")
                    .format("lll");
            } else if (schema.enum) {
                const enumName =
                    typeof cellValue === "number"
                        ? schema["x-enumNames"][schema.enum.indexOf(cellValue)] // Enum format is the identifier as number, so look up the name
                        : cellValue; // Enum format is provided directly by name
                return this.messages[enumName]
                    ? this.messages[enumName]
                    : enumName;
            } else if(schema["x-rel-textfield"] && typeof cellValue === 'object' && cellValue != null){
                const key = schema["x-rel-textfield"];
                return  cellValue[key];
            }
            return cellValue;
        },
        // eslint-disable-next-line no-unused-vars
        rowClick(row, column, event) {
            if (column.label) {
                //this.defaultAction.execute(row, event, column);
                this.$refs.table.toggleRowExpansion(row, true);
            }
        },
        addRow() {
            const properties = this.rowSchema.properties;
            const row = Object.keys(properties).reduce(
                (row, property) => ({ ...row, [property]: properties[property].default }),
                {}
            );

            this.model = this.model ? [...this.model, row] : [row];
            let self=this;
            Vue.nextTick().then(function () {
                self.$refs.table.toggleRowExpansion(row, true);
            })            
        }
    }
};
</script>
