<template>
  <div id="app">




    <oa-select v-model="val" :schema="schema"></oa-select>
    {{val}}
  </div>
</template>

<script>

import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCrud from './index'
Vue.use(VueCrud);

export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      schema:{
        enum:[1,2,3],
        "x-enumNames":["e1","e2","e3"]
      },
      val:1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
