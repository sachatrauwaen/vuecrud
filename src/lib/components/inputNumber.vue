<template>
  <el-input-number v-model="model" ></el-input-number>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'oa-inputnumber',

  props: {
    value: Number,
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
