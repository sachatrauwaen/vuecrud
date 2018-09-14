import CrudApp from './CrudApp'
import OaConnector from './connectors/OaConnector'

import Address from './components/address.vue'
import CheckboxGroup from './components/checkboxGroup.vue'
import CrudForm from './components/crudform.vue'
import CrudGrid from './components/crudgrid.vue'
import Date from './components/date.vue'
import Datetime from './components/datetime.vue'
import Daterange from './components/daterange.vue'
import DialogForm from './components/dialogform.vue'
import Field from './components/field.vue'
import Fields from './components/fields.vue'
import FilterForm from './components/filterform.vue'
import Form from './components/form.vue'
import FormItem from './components/formitem.vue'
import Grid from './components/grid.vue'
import List from './components/list.vue'
import Input from './components/input.vue'
import Inputnumber from './components/inputnumber.vue'
import RelationToMany from './components/relationtomany.vue'
import Relation from './components/relation.vue'
import Select from './components/select.vue'
import Switch from './components/switch.vue'
import Textarea from './components/textarea.vue'
import Time from './components/time.vue'


const components = [
  Address,
  CheckboxGroup,
  CrudForm,
  CrudGrid,
  Date,
  Datetime,
  Daterange,
  DialogForm,
  Field,
  Fields,
  FilterForm,
  Form,
  FormItem,
  Grid,
  List,
  Input,
  Inputnumber,
  RelationToMany,
  Relation,
  Select,
  Switch,
  Textarea,
  Time
];

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.$loadComponent = function (opts) {
    var script = document.createElement('script');
  
    opts.onLoad = opts.onLoad || function () { };
    opts.onError = opts.onError || function () { };
  
    script.src = opts.path;
    script.async = true;
  
    script.onload = function () {
        var component = Vue.component(opts.name);
  
        if (component) {
            opts.onLoad(component);
        } else {
            opts.onError();
        }
    };
    script.onerror = opts.onError;
  
    document.body.appendChild(script);
  }

}

/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.groupBy = function (keyFunction) {
  var groups = {};
  this.forEach(function (el) {
      var key = keyFunction(el);
      if (key in groups == false) {
          groups[key] = [];
      }
      groups[key].push(el);
  });
  return Object.keys(groups).map(function (key) {
      return {
          key: key,
          values: groups[key]
      };
  });
};

let comps ={}
components.forEach((val)=>{
  comps[val.name]=val;
})


export default {
  version: '2.0.0',
  install,
  //components:comps,
  OaConnector: OaConnector,
  createApp:CrudApp.create 
};

//const _default = module.exports;
//export { _default as default };
