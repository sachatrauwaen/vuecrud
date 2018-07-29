import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);


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

    create(id, layout) {
        
        new Vue({
            router: router,
            connector: OaConnector,
            //render: h => h('router-view')
            //render: h => h(layout, [h('router-view')]),
            render(h) {
                return h(layout, {
                    scopedSlots: {
                        default: (props) => {
                            props.title=this.pageTitle;
                            return h('router-view')
                        }
                    },
                    props: {
                        title: this.pageTitle
                    }
                })
            },
            computed: {
                messages(){
                    return OaConnector.messages();
                },
                pageTitle: function () {
                    if (this.$route.params.resource) {
                        let key = this.$route.params.resource.capitalize() + 's';
                        let title = this.messages[[this.$route.params.resource.capitalize() + 's']]
                        return title ? title : key;
                    }
                    else {
                        return 'Crud app';
                    }
                }
            }

        }).$mount(id)

    }
}