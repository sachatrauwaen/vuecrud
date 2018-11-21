<template>
<div>
    <el-tabs v-if="Object.keys(tabs).length > 1" :value="Object.keys(tabs)[0]">
        <el-tab-pane v-for="(gvalue, gkey) in tabs" :key="gkey" :label="label(gkey)" :name="gkey">
            <el-row :gutter="10">
                <el-col v-for="(cvalue, ckey) in gvalue.columns" :key="ckey" :xs="24/Object.keys(gvalue.columns).length" :sm="24/Object.keys(gvalue.columns).length" :md="24/Object.keys(gvalue.columns).length" :lg="24/Object.keys(gvalue.columns).length" :xl="24/Object.keys(gvalue.columns).length">
                    <oa-field v-for="(value, key) in cvalue" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" @propChange="propChange" :connector="connector" :appService="appService"></oa-field>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    <el-row v-else :gutter="10">
        <el-col v-for="(cvalue, ckey) in columns" :key="ckey" :xs="24/Object.keys(columns).length" :sm="24/Object.keys(columns).length" :md="24/Object.keys(columns).length" :lg="24/Object.keys(columns).length" :xl="24/Object.keys(columns).length">
            <oa-field v-for="(value, key) in cvalue" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" @propChange="propChange" :connector="connector" :appService="appService"></oa-field>
        </el-col>
    </el-row>
    <el-form-item>
        <el-button v-for="action in actions" :key="action.name" size="small" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
    </el-form-item>
</div>
</template>

<script>
import { default as Utils } from '../utils/utils'
export default {
  name: "oa-fields",
  props: {
    model: {
      type:Object,
      default:function () {
        return {};
      }
    },
    schema: {},
    options: {},
    messages: {},
    actions: {},
    connector: {},
    appService: String
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
        let fields = {};
        for (let key in this.schema.properties) {
          if (
            key !== "id" &&
            !this.schema.properties[key].readonly /*&&
            !this.schema.properties[key]["x-rel-app"] &&
            !this.schema.properties[key]["x-rel-to-many-app"]*/
          ) {
            fields[key] = this.schema.properties[key];
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
    }
  },
  methods: {
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
          columns[column] = {};
        }
        columns[column][key] = el;
      }
      return columns;
    }
  }
};
</script>
