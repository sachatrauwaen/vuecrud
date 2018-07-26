<template>
  <el-input v-model="model"></el-input>
</template>

<script>
  import Vue from "vue";
     
  export default {
              name: "inputComponent",

        props: {
            value: String,
            schema: {},
            prop: String,
            options: {

            },
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
        },
    }
   
</script>