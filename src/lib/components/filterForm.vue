<template>
<el-form ref="form" :model="model" :rules="rules" :label-width="labelwidth" :inline="!isMobile" :label-position="labelPosition" >
    <oa-field v-for="(value, key) in fields" :key="key" :prop="key" :schema="properties[key]" v-model="model[key]" :messages="messages" :connector="connector" @propChange="propChange" @input="v => propChange(key, v)"></oa-field>
    <el-form-item>
        <el-button v-for="action in actions" :key="action.name" size="small" :icon="action.icon" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import { default as Utils } from '../utils/utils'
export default {
  name: 'oa-filter-form',
  props: {
    model: {},
    schema: {},
    connector: {},
    options: {},
    messages: {},
    actions: {},
    columns: {}
  },
  data () {
    return {}
  },
  computed: {
    properties () {
      return this.schema.properties
    },
    fields () {
      if (this.options) {
        return this.options.fields
      } else {
        let fields = {}
        for (var key in this.schema.properties) {
          if (
                key != 'id'
            && !this.schema.properties[key].readonly
            && !this.schema.properties[key]['x-rel-app']
            && !this.schema.properties[key]['x-rel-to-many-app']
          ) {
            fields[key] = this.schema.properties[key]
          }
        }
        return fields
      }
    },
    rules () {
      var rules = {}
      for (var key in this.schema.properties) {
        //var prop = this.schema.properties[key]
        var itemRules = []
        rules[key] = itemRules
      }
      return rules
    },
    isMobile () {
      return Utils.isMobile(window);
    },
    labelPosition () {
      return this.isMobile ? 'top' : 'right'
    },
    labelwidth () {
      return this.isMobile ? '100px' : ''
    }
  },
  methods: {
    validate (callback = (() => {})) {
      this.$refs.form.validate(callback)
    },
    submitForm () {
      this.$refs.form.validate(function (valid) {
        if (valid) {
          alert('submit!')
        } else {          
          return false
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    label (name) {
      if (this.messages && this.messages[name])
        return this.messages[name]
      else
        return name
    },
    propChange (key, value) {
		this.$set(this.model, key, value);

		// If eager, emit change event
		if(this.schema.properties[key]['x-ui-filter-eager'] === true)
			this.$emit('filterEager', this.model);
    }
  }
}
</script>
