<template>
  <el-input v-model="model"></el-input>
</template>

<script>
export default {
  name: 'oa-input',

  props: {
    value: String,
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
