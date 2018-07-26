import Select from './components/select.vue'

const components = [
  Select

]

const install = function (Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  })
  
};
  
  /* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
  
module.exports = {
  version: '2.4.5',
  install,
  Select,
};
  
module.exports.default = module.exports;