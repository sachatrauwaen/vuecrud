<template>
    <div>
        <el-tabs v-if="Object.keys(tabs).length > 1" :value="Object.keys(tabs)[0]">
            <el-tab-pane v-for="(gvalue, gkey) in tabs" :key="gkey" :label="label(gkey)" :name="gkey">
                <el-row :gutter="10">
                    <el-col v-for="(cvalue, ckey) in gvalue.columns"
                            :key="ckey"
                            :xs="cvalue.span"
                            :sm="cvalue.span"
                            :md="cvalue.span"
                            :lg="cvalue.span"
                            :xl="cvalue.span">
                        <div v-for="(pvalue, pkey) in cvalue" :key="pkey" class="oa-fields-card">
                            <div v-if="pkey == 'undefined'">
                                <oa-field v-for="(value, key) in filterFields(pvalue.fields)"
                                          :key="key"
                                          :prop="key"
                                          :schema="property(key)"
                                          v-model="model[key]"
                                          :messages="messages"
                                          @propChange="propChange"
                                          :connector="connector"
                                          :resource="resource"
                                          :parent-model="cascadeModel"
                                          :readOnly="readOnly"></oa-field>
                            </div>
                            <el-card v-else>
                                <div slot="header" v-if="pkey != 'undefined'">
                                    <span>{{pkey}}</span>
                                </div>
                                <oa-field v-for="(value, key) in filterFields(pvalue.fields)"
                                          :key="key"
                                          :prop="key"
                                          :schema="property(key)"
                                          v-model="model[key]"
                                          :messages="messages"
                                          @propChange="propChange"
                                          :connector="connector"
                                          :resource="resource"
                                          :parent-model="cascadeModel"
                                          :readOnly="readOnly"></oa-field>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-row v-else :gutter="10">
            <el-col v-for="(cvalue, ckey) in columns"
                    :key="ckey"
                    :xs="cvalue.span"
                    :sm="cvalue.span"
                    :md="cvalue.span"
                    :lg="cvalue.span"
                    :xl="cvalue.span">
                <div v-for="(pvalue, pkey) in cvalue.cards" :key="pkey" class="oa-fields-card">
                    <div v-if="pkey == 'undefined'">
                        <oa-field v-for="(value, key) in filterFields(pvalue.fields)"
                                  :key="key"
                                  :prop="key"
                                  :schema="property(key)"
                                  v-model="model[key]"
                                  :messages="messages"
                                  @propChange="propChange"
                                  :connector="connector"
                                  :resource="resource"
                                  :parent-model="cascadeModel"
                                  :readOnly="readOnly"></oa-field>
                    </div>
                    <el-card v-else>
                        <div slot="header" v-if="pkey != 'undefined'">
                            <span>{{pkey}}</span>
                        </div>
                        <oa-field v-for="(value, key) in filterFields(pvalue.fields)"
                                  :key="key"
                                  :prop="key"
                                  :schema="property(key)"
                                  v-model="model[key]"
                                  :messages="messages"
                                  @propChange="propChange"
                                  :connector="connector"
                                  :resource="resource"
                                  :parent-model="cascadeModel"
                                  :readOnly="readOnly"></oa-field>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { default as Utils } from "../utils/utils";
    export default {
        name: "oa-fields",
        props: {
            model: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            schema: {},
            options: {},
            messages: {},
            connector: {},
            resource: String,
            parentModel: {},
            readOnly: Boolean
        },
        data() {
            return {};
        },
        computed: {
            properties() {
                //return this.schema.properties;
                return Utils.jsonSchema.simplify(this.schema).properties;
            },
            fields() {
                if (this.options) {
                    return this.options.fields;
                } else {
                    let fields = {};
                    for (let key in this.properties) {
                        if (
                            key !== "id" &&
                            !this.property(key).readonly &&
                            (!Object.prototype.hasOwnProperty.call(this.property(key), "x-ui-form") || this.property(key)["x-ui-form"]) &&
                            (this.connector.canActivate() || key != "isActive")
                            /*&&
                                                !this.schema.properties[key]["x-rel-app"] &&
                                                !this.schema.properties[key]["x-rel-to-many-app"]*/
                        ) {
                            fields[key] = this.property(key);
                        }
                    }
                    return fields;
                }
            },
            tabs() {
                let groups = {};
                for (let key in this.fields) {
                    let el = this.fields[key];
                    const group = el["x-ui-group"];
                    if (group in groups == false) {
                        groups[group] = {};
                    }
                    groups[group][key] = el;
                }
                for (let key in groups) {
                    let el = groups[key];
                    el.columns = this.generateColumns(el);
                }
                return groups;
            },
            columns() {
                return this.generateColumns(this.fields);
            },
            isMobile() {
                return Utils.isMobile(window);
            },
            labelPosition() {
                return this.isMobile ? "top" : "right";
            },
            cascadeModel() {
                return {
                    model: this.model,
                    parent: this.parentModel
                };
            }
        },
        methods: {
            filterFields(fields) {
                let fs = {};
                for (var i in fields) {
                    let f = fields[i];
                    if (this.visible(f)) {
                        fs[i] = f;
                    }
                }
                return fs;
            },
            property(key) {
                return Utils.jsonSchema.simplify(this.properties[key]);
            },
            label(name) {
                if (this.messages && this.messages[name]) return this.messages[name];
                else return name;
            },
            propChange(key, value) {
                this.$set(this.model, key, value);
            },
            generateColumns(fields) {
                var columns = {};
                for (var key in fields) {
                    var el = this.fields[key];
                    var column = el["x-ui-column"];
                    if (column in columns == false) {
                        var columnSpan = el["x-ui-column-span"] || 0;
                        columns[column] = {
                            fields: {},
                            span: columnSpan
                        };
                    }
                    columns[column].fields[key] = el;
                }
                var cardCols = {};
                for (var col in columns) {
                    //columns[col].span = columns[col].span || (24 / columns[col].fields.length);
                    cardCols[col] = {
                        cards : this.generateCards(columns[col].fields),
                        span: columns[col].span || (24 / Object.keys(columns).length)
                    };
                }
                return cardCols;
            },
            generateCards(fields) {
                var cards = {};
                for (var key in fields) {
                    var el = this.fields[key];
                    var card = el["x-ui-card"];
                    if (card in cards == false) {
                        cards[card] = {
                            fields: {}
                        };
                    }
                    cards[card].fields[key] = el;
                }
                return cards;
            },
            visible(field) {
                let dependencyField = field["x-ui-dependency-field"];
                let dependencyValue = field["x-ui-dependency-value"];
                if (dependencyField) {
                    if (Array.isArray(this.model[dependencyField])) {
                        if (Array.isArray(dependencyValue)) {
                            for (var i = 0; i < dependencyValue.length; i++) {
                                if (this.model[dependencyField].includes(dependencyValue[i])) return true;
                            }
                            return false;
                        } else {
                            return this.model[dependencyField].includes(dependencyValue);
                        }
                    } else {
                        return this.model[dependencyField] == dependencyValue;
                    }
                } else {
                    return true;
                }
            }
        }
    };
</script>
<style>
    .oa-fields-card {
        margin-bottom: 20px;
    }

        .oa-fields-card .el-card__header {
            padding: 5px 20px;
            background-color: #f5f7fa;
        }
</style>
