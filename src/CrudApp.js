import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCrud from './index'
Vue.use(VueCrud);

import OaConnector from './connectors/OaConnector'

const crudGrid = Vue.component('oa-crud-grid');
const crudForm = Vue.component('oa-crud-form');
// const crudGrid = Vue.component('OaCrudGrid');
// const crudForm = Vue.component('OaCrudForm');

const router = new VueRouter({
    //scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/:module/:resource', component: crudGrid, name: 'grid' },
        { path: '/:module/:resource/edit/:id', component: crudForm, name: 'edit' },
        { path: '/:module/:resource/add', component: crudForm, name: 'add' }
    ]
});

export default {

    create(id) {
        new Vue({
            router: router,
            connector: OaConnector,
            render: h => h('router-view')
        }).$mount(id)

    }
}