<template>
<div id="app">
    <oa-select v-model="val" :schema="schema"></oa-select>

    <el-form>
        <oa-field v-model="val" prop="state" :schema="schema" ></oa-field>
    </el-form>
    <a href="#/app/user">Users</a>

    <hr />

    <router-view></router-view>

</div>
</template>

<script>

// eslint-disable-next-line
import Demo from './demo'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

function route(path, component, name, children) {
  return {
      exact: true,
      path,
      name,
      children,
      component: component
  };
}
const crudGrid = Vue.component('oa-crud-grid');
const crudForm = Vue.component('oa-crud-form');
// const crudGrid = Vue.component('OaCrudGrid');
// const crudForm = Vue.component('OaCrudForm');



const router = new VueRouter({
  //scrollBehavior: () => ({ y: 0 }),
  routes: [
      route('/:module/:resource', crudGrid, 'grid'),
      route('/:module/:resource/edit/:id', crudForm, 'edit'),
      route('/:module/:resource/add', crudForm, 'add'),
      //
  ]
});


export default {
    name: 'app',
    components: {

    },
    data() {
        return {
            schema: {
                enum: [1, 2, 3],
                "x-enumNames": ["e1", "e2", "e3"]
            },
            val: 1
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
