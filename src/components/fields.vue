<template>
<div>
    <el-tabs v-if="Object.keys(tabs).length > 1" :value="Object.keys(tabs)[0]">
        <el-tab-pane v-for="(gvalue, gkey) in tabs" :key="gkey" :label="label(gkey)" :name="gkey">
            <el-row :gutter="10">
                <el-col v-for="(cvalue, ckey) in gvalue.columns" :key="ckey" :xs="24/Object.keys(gvalue.columns).length" :sm="24/Object.keys(gvalue.columns).length" :md="24/Object.keys(gvalue.columns).length" :lg="24/Object.keys(gvalue.columns).length" :xl="24/Object.keys(gvalue.columns).length">
                    <oa-field v-for="(value, key) in cvalue" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" @propChange="propChange" :connector="connector" :resource="resource"></oa-field>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    <el-row v-else :gutter="10">
        <el-col v-for="(cvalue, ckey) in columns" :key="ckey" :xs="24/Object.keys(columns).length" :sm="24/Object.keys(columns).length" :md="24/Object.keys(columns).length" :lg="24/Object.keys(columns).length" :xl="24/Object.keys(columns).length">
            <oa-field v-for="(value, key) in cvalue" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" @propChange="propChange" :connector="connector"  :resource="resource"></oa-field>
        </el-col>
    </el-row>
    <el-form-item>
        <el-button v-for="action in actions" :key="action.name" size="small" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
    </el-form-item>
</div>
</template>

<script>
export default {
  name: "oa-fields",
  props: {
    model: {},
    schema: {},
    options: {},
    messages: {},
    actions: {},
    connector: {},
    resource: {},
  },
  data: function() {
    return {};
  },
  computed: {
    properties: function() {
      return this.schema.properties;
    },
    fields: function() {
      if (this.options) {
        return this.options.fields;
      } else {
        var fields = {};
        for (var key in this.schema.properties) {
          if (
            key != "id" &&
            !this.schema.properties[key].readonly &&
            !this.schema.properties[key]["x-rel-app"] &&
            !this.schema.properties[key]["x-rel-to-many-app"]
          ) {
            fields[key] = this.schema.properties[key];
          }
        }
        return fields;
      }
    },
    tabs: function() {
      var groups = {};
      for (let key in this.fields) {
        let el = this.fields[key];
        var group = el["x-ui-group"];
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
    columns: function() {
      return this.generateColumns(this.fields);
    },
    isMobile: function() {
      return window.matchMedia("only screen and (max-width: 760px)").matches;
    },
    labelPosition: function() {
      return this.isMobile ? "top" : "right";
    }
  },
  methods: {
    label: function(name) {
      if (this.messages && this.messages[name]) return this.messages[name];
      else return name;
    },
    propChange: function(key, value) {
      this.$set(this.model, key, value);
    },
    generateColumns: function(fields) {
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
