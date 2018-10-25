<template>
  <el-date-picker v-model="model" type="datetime" format="dd/MM/yyyy HH:mm" ></el-date-picker>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'oa-datetime',

  props: {
    value: {},
    schema: {},
    prop: String,
    options: {

    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}

</script>
