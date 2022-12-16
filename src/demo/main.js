import Vue from 'vue'

// eslint-disable-next-line
import Demo from './demo'

import UserCustomComponent from './UserCustomComponent.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, {locale});


import VueCrud from '../lib'
import Layout from './layout'

Vue.component("oa-user-custom-component", UserCustomComponent)

VueCrud.createApp('#app', Layout);

//VueCrud.createSettings('#settings', Layout);
