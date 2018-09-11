import CrudApp from './CrudApp'
import OaConnector from './connectors/OaConnector'

import Address from './components/address.vue'
import CheckboxGroup from './components/checkboxGroup.vue'
import CrudForm from './components/crudForm.vue'
import CrudGrid from './components/crudGrid.vue'
import Date from './components/date.vue'
import Daterange from './components/daterange.vue'
import DialogForm from './components/dialogForm.vue'
import Field from './components/field.vue'
import Fields from './components/fields.vue'
import FilterForm from './components/filterForm.vue'
import Form from './components/form.vue'
import FormItem from './components/formItem.vue'
import Grid from './components/grid.vue'
import List from './components/list.vue'
import Input from './components/input.vue'
import Inputnumber from './components/inputNumber.vue'
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
  components.map(component => Vue.component(component.name, component));

  Vue.$loadComponent = function (opts) {
    var script = document.createElement('script');
  
    opts.onLoad = opts.onLoad || function () { };
    opts.onError = opts.onError || function () { };
  
    script.src = opts.path;
    script.async = true;
  
    script.onload = function () {
        var component = Vue.component(opts.name);
        if (component)
          opts.onLoad(component);
        else
          opts.onError();
    };
    script.onerror = opts.onError;
  
    document.body.appendChild(script);
  }

}

String.prototype.capitalize = () => this.charAt(0).toUpperCase() + this.slice(1);

Array.prototype.groupBy = function (keyFunction) {
  var groups = {};
  this.forEach(function (el) {
      var key = keyFunction(el);
      if (key in groups == false) {
          groups[key] = [];
      }
      groups[key].push(el);
  });
  return Object
    .keys(groups)
    .map((key) => ({
      key: key,
      values: groups[key]
    }));
};


export default {
  version: '2.0.0',
  install,
  OaConnector: OaConnector,
  createApp:CrudApp.create 
};
