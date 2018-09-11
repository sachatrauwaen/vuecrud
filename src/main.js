import Vue from 'vue'

// eslint-disable-next-line
import Demo from './demo'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, {locale});


import VueCrud from './index'
import Layout from './layout'

VueCrud.createApp('#app', Layout);