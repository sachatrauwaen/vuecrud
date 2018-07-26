<template>
<el-form-item :label="label" :prop="prop">
    <slot></slot>
    <slot name="footer"></slot>
</el-form-item>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'oaFormItem',
  props: {
    label: {},
    prop: String,
    messages: Object
  },
  components: {},
  computed: {},
  methods: {}
}
</script>
