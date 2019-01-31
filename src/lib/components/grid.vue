<template>
<div>
    <el-table v-if="!isMobile" :data="model" @row-click="rowClick" style="width: 100%" :row-style="{cursor: 'pointer'}" @sort-change="sortChange">
        <el-table-column v-for="(value, key) in columns" :key="key" :prop="key" :label="label(key)" :formatter="formatter" class-name="crudcell" :sortable="isSortable(key)"></el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" v-show="actionVisible(action, scope.row, scope.$index)" @click="action.execute(scope.row, scope.$index)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-card v-else style="margin-bottom:10px;" v-for="row in model" :key="row.id">
        <el-row :gutter="10" v-for="(value, key) in columns" :key="key">
            <el-col :span="12">{{label(key)}}</el-col>
            <el-col :span="12">{{format(key, row[key])}}</el-col>
        </el-row>
        <div style="padding-top:10px;">
            <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" v-show="actionVisible(action, row)" @click="action.execute(row)"></el-button>
        </div>
    </el-card>
</div>
</template>

<script>
import { default as Utils } from "../utils/utils";
export default {
    name: "oa-grid",
    props: {
        model: {},
        schema: {},
        messages: {},
        actions: {},
        defaultAction: {},
        locale: {}, // moment locale (e.g. 'fr', 'en', 'nl', ...)
        doOnSort: {}
    },
    computed: {
        columns() {
            var fields = {};
            for (var key in this.schema.properties) {
                if (
                    key != "id" &&
                    this.schema.properties[key].type != "array" &&
                    (!this.schema.properties[key].hasOwnProperty("x-ui-grid") ||
                        this.schema.properties[key]["x-ui-grid"])
                ) {
                    fields[key] = this.schema.properties[key];
                }
            }
            return fields;
        },
        isMobile() {
            return Utils.isMobile(window);
        }
    },
    methods: {
        isSortable(prop) {
            const sortable = this.schema.properties[prop]["x-ui-grid-sortable"];
            return sortable === undefined ? false : "custom";
        },
        sortChange({ column, prop, order }){
            if (this.doOnSort) this.doOnSort({ column, prop, order });
        },
        label(prop) {
            var name = this.schema.properties[prop].title
                ? this.schema.properties[prop].title
                : Utils.capitalize(prop);
            if (this.messages && this.messages[name]) {
                return this.messages[name];
            } else {
                return name;
            }
        },
        formatter(row, column, cellValue) {
            return this.format(column.property, cellValue);
        },
        format(property, cellValue) {
            const schema = Utils.jsonSchema.getNotNull(
                this.schema.properties[property]
            );
            if (schema.type == "boolean") {
                return cellValue ? this.messages["Yes"] : this.messages["No"];
            } else if (schema["x-type"] == "date") {
                if (!cellValue) return "";
                // eslint-disable-next-line
                return moment(cellValue)
                    .locale(this.locale)
                    .format("ll");
            } else if (schema.format == "date-time") {
                if (!cellValue) return "";
                // eslint-disable-next-line
                return moment(cellValue)
                    .locale(this.locale)
                    .format("lll"); // TODO: Refactor: Assumes globally loaded moment
            } else if (schema.enum) {
                const enumName =
                    typeof cellValue === "number"
                        ? schema["x-enumNames"][schema.enum.indexOf(cellValue)] // Enum format is the identifier as number, so look up the name
                        : cellValue; // Enum format is provided directly by name
                return this.messages[enumName]
                    ? this.messages[enumName]
                    : enumName;
            }
            return cellValue;
        },
        rowClick(row, event, column) {
            if (column.label) {
                this.defaultAction.execute(row, event, column);
            }
        },
        actionVisible(action, row, index) {
            if (action.visible) {
                return action.visible(row, index);
            } else {
                return true;
            }
        }
    }
};
</script>
