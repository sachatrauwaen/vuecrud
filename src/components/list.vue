<template>
<div>
    <el-table ref="table" v-if="!isMobile" :data="model" @row-click="rowClick" style="width: 100%" :row-style="{cursor: 'pointer'}">
        <el-table-column type="expand">
            <template slot-scope="props">
                <oa-fields :model="props.row" :schema="rowSchema" :connector="connector" :messages="messages"></oa-fields>
            </template>
        </el-table-column>
        <el-table-column v-for="(value, key) in columns" :key="key" :prop="key" :label="label(key)" :formatter="formatter" class-name="crudcell"></el-table-column>
        <el-table-column align="right" min-width="120px">
            <template slot-scope="scope">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" @click="action.execute(scope.row, scope.$index)"></el-button>
            </template>
        </el-table-column>
        <template slot="append">
            <el-button icon="el-icon-plus" size="small" @click="addRow()" style="margin:10px auto;display:block"></el-button>
        </template>
    </el-table>
    <template v-else>
        <el-card  style="margin-bottom:10px;" v-for="row in model" :key="row.id">
            <oa-fields :model="row" :schema="rowSchema" :connector="connector" :messages="messages"></oa-fields>
            <div style="padding-top:10px;">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" @click="action.execute(row)"></el-button>
            </div>
        </el-card>
        <div style="padding-top:10px;">
            <el-button icon="el-icon-plus" size="small" @click="addRow()" style="margin:10px auto;display:block"></el-button>
        </div>
    </template>
</div>
</template>

<script>
import { default as Utils } from "../utils";

export default {
    name: "oa-list",
    props: {
        value: {},
        schema: {},
        messages: Object,
        prop: String,
        connector: {}
    },
    data: function () {
        return {
            actions: [{
                name: this.translate("Delete"),
                icon: "el-icon-delete",
                execute: (row) => {
                    var index = this.model.indexOf(row);
                    if (index > -1) {
                        this.model.splice(index, 1);
                    }
                }
            },
            {
                name: this.translate("Duplicate"),
                icon: "el-icon-plus",
                execute: (row) => {
                        var clone = JSON.parse(JSON.stringify(row))
                        if (clone.hasOwnProperty('id')){
                            delete(clone.id);
                        }
                        this.model.push(clone);
                }
            }]
        };
    },
    computed: {
        model: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit("input", val);
            }
        },
        rowSchema: function () {
            return this.schema.items;
        },
        columns: function () {
            var fields = {};
            var sch = this.schema.items;
            for (var key in sch.properties) {
                if (
                    key != "id" &&
                    sch.properties[key].type != "array" &&
                    (!sch.properties[key].hasOwnProperty("x-ui-grid") ||
                        sch.properties[key]["x-ui-grid"])
                ) {
                    fields[key] = sch.properties[key];
                }
            }
            return fields;
        },
        isMobile: function () {
            return Utils.isMobile(window);
        }
    },
    created: function () {
        
    },
    methods: {
        translate: function (text) {
            if (this.messages && this.messages[text]) return this.messages[text];
            else return text;
        },
        label: function (prop) {
            var sch = this.schema.items;
            var name = sch.properties[prop].title ?
                sch.properties[prop].title :
                Utils.capitalize(prop);
            if (this.messages && this.messages[name]) return this.messages[name];
            else return name;
        },
        formatter: function (row, column, cellValue) {
            var schema = Utils.jsonSchema.getNotNull(
                this.schema.items.properties[column.property]
            );
            if (schema.type == "boolean") {
                return cellValue ? this.messages["Yes"] : this.messages["No"];
            } else if (schema.format == "date-time") {
                if (!cellValue) return "";
                // eslint-disable-next-line
                return moment(cellValue)
                    .locale("fr")
                    .format("lll");
            } else if (schema.enum) {
                var i = schema.enum.indexOf(cellValue);
                return this.messages[schema["x-enumNames"][i]] ?
                    this.messages[schema["x-enumNames"][i]] :
                    schema["x-enumNames"][i];
            }
            return cellValue;
        },
        rowClick: function (row, event, column) {
            if (column.label) {
                //this.defaultAction.execute(row, event, column);
                this.$refs.table.toggleRowExpansion(row, true);
            }
        },
        addRow: function () {
            var row = {};
            var sch = this.schema.items;
            for (var key in sch.properties) {
                row[key] = sch.default;
            }
            var model = this.model;
            if (model === undefined) {
                model = [];
            }
            model.push(row);
            this.model = model;
            this.$refs.table.toggleRowExpansion(row, true);
        }
    }
};
</script>
