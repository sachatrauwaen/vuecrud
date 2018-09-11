<template>
<el-form ref="form" :model="model" :rules="rules" :label-width="labelwidth" :inline="!isMobile" :label-position="labelPosition" >
    <oa-field v-for="(value, key) in fields" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" :connector="connector" :resource="resource" @propChange="propChange"></oa-field>
    <el-form-item>
        <el-button v-for="action in actions" :key="action.name" size="small" :icon="action.icon" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import { default as Utils } from "../utils";
export default {
  name: 'oa-filter-form',
  props: {
    model: {},
    schema: {},
    connector: {},
    resource: {},
    options: {},
    messages: {},
    actions: {},
    columns: {}
  },
  data: function () {
    return {}
  },
  computed: {
    properties: function () {
      return this.schema.properties
    },
    fields: function () {
      if (this.options) {
        return this.options.fields
      } else {
        var fields = {}
        for (var key in this.schema.properties) {
          if (
            key != 'id' &&
                        !this.schema.properties[key].readonly &&
                        !this.schema.properties[key]['x-rel-app'] &&
                        !this.schema.properties[key]['x-rel-to-many-app']
          ) {
            fields[key] = this.schema.properties[key]
          }
        }
        return fields
      }
    },
    rules: function () {
      var rules = {}
      for (var key in this.schema.properties) {
        //var prop = this.schema.properties[key]
        var itemRules = []
        rules[key] = itemRules
      }
      return rules
    },
    isMobile: function () {
      return Utils.isMobile(window);
    },
    labelPosition: function () {
      return this.isMobile ? 'top' : 'right'
    },
    labelwidth: function () {
      return this.isMobile ? '100px' : ''
    }
  },
  methods: {
    validate: function (callback) {
      this.$refs.form.validate(function (valid) {
        if (callback) callback(valid)
      })
    },
    submitForm: function () {
      this.$refs.form.validate(function (valid) {
        if (valid) {
          alert('submit!')
        } else {          
          return false
        }
      })
    },
    resetForm: function () {
      this.$refs.form.resetFields()
    },
    label: function (name) {
      if (this.messages && this.messages[name]) return this.messages[name]
      else return name
    },
    propChange: function (key, value) {
      this.$set(this.model, key, value)
    }
  }
  /*
          created: function(){

              for (key in this.fields) {
                  if (this.fields[key].type == "string"){
                      Vue.set(this.model, key, "");
                  } else if (this.fields[key].type == "int") {
                      Vue.set(this.model, key, 0);
                  }
              }

          }
          */
}
</script>
