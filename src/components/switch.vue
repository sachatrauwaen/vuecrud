<template>
<el-switch v-model="model" on-text="" off-text="">
</el-switch>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'OaSwitch',

  props: {
    value: Boolean,
    schema: {},
    prop: String,
    options: {

    }
  },
  computed: {
    model: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
