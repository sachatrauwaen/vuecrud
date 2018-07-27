import Select from './components/select.vue'

const components = [
  Select

]

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '2.4.5',
  install,
  Select
};

//const _default = module.exports;
//export { _default as default };
