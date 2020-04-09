import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCrud from '../lib/index'
import { default as Utils } from "../lib/utils/utils";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import localeEN from 'element-ui/lib/locale/lang/en'
import localeFR from 'element-ui/lib/locale/lang/fr'
import localeNL from 'element-ui/lib/locale/lang/nl'

import GridLayout from './GridLayout.vue'
import FormLayout from './FormLayout.vue'


export default {
    create(id, layout, data, gridLayout, formLayout) {

        if (gridLayout){
            Vue.component('oa-grid-layout',gridLayout );
        } else {
            Vue.component('oa-grid-layout',GridLayout );
        }

        if (formLayout){
            Vue.component('oa-form-layout',formLayout );
        } else {
            Vue.component('oa-form-layout',FormLayout );
        }


        Vue.use(VueRouter);

        let locale = localeEN;
        const loc = VueCrud.OaConnector.locale();
        if (loc == 'fr') {
            locale = localeFR;
        } else if (loc == 'nl') {
            locale = localeNL;
        }
        
        Vue.use(ElementUI, { locale });

        Vue.use(VueCrud);

        const crudGrid = Vue.component('oa-crud-grid');
        const crudForm = Vue.component('oa-crud-form');

        const router = new VueRouter({
            routes: [
                { path: '/:module/:resource', component: crudGrid, name: 'grid' },
                { path: '/:module/:resource/edit/:id', component: crudForm, name: 'edit' },
                { path: '/:module/:resource/add', component: crudForm, name: 'add' }
            ]
        });

        new Vue({
            router: router,
            data : data || {},
            connector: VueCrud.OaConnector,
            render(h) {
                return h(layout, {
                    scopedSlots: {
                        default: () => h('keep-alive', 
                        {
                            props: {
                                include: 'oa-crud-grid'
                            }
                        },
                        [
                            h('router-view')
                        ])
                    },
                    props: {
                        title: this.pageTitle
                    }
                })
            },
            computed: {
                messages() {
                    return VueCrud.OaConnector.messages(this.$route.params.module);
                },
                pageTitle: function () {
                    if (this.$route.params.resource) {
                        let key = Utils.capitalize(this.$route.params.resource) + 's';
                        let title = this.messages[[key]]
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