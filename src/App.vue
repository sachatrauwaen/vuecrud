<template>
  <div id="app">
    <oa-select v-model="val" :schema="schema"></oa-select>

  <a href="#/app/user">Users</a>

<hr />

   <router-view></router-view>


  </div>
</template>

<script>

import Vue from 'vue'





import Demo from './demo'


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
