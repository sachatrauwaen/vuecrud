import Address from '../components/address.vue'
import Cards from '../components/cards.vue'
import CheckboxGroup from '../components/checkboxGroup.vue'
import CrudForm from '../components/crudForm.vue'
import CrudFormWithoutRouter from '../components/crudFormWithoutRouter.vue'
import CrudGrid from '../components/crudGrid.vue'
import CrudGridWithoutRouter from '../components/crudGridWithoutRouter.vue'
import Date from '../components/date.vue'
import Daterange from '../components/daterange.vue'
import Datetime from '../components/datetime.vue'
import DialogForm from '../components/dialogForm.vue'
import Field from '../components/field.vue'
import Fields from '../components/fields.vue'
import FilterForm from '../components/filterForm.vue'
import AdvFilterForm from '../components/advfilterForm.vue'
import Form from '../components/form.vue'
import FormItem from '../components/formItem.vue'
import Grid from '../components/grid.vue'
import List from '../components/list.vue'
import Input from '../components/input.vue'
import Inputnumber from '../components/inputNumber.vue'
import RelationToMany from '../components/relationtomany.vue'
import Relation from '../components/relation.vue'
import Select from '../components/select.vue'
import Switch from '../components/switch.vue'
import Textarea from '../components/textarea.vue'
import Time from '../components/time.vue'
import CommandForm from '../components/commandForm.vue'


export const components = {
    Address,
    Cards,
    CheckboxGroup,
    CrudForm,
    CrudGrid,
    Date,
    Daterange,
    Datetime,
    DialogForm,
    Field,
    Fields,
    FilterForm,
    AdvFilterForm,
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
    Time,
    CrudGridWithoutRouter,
    CrudFormWithoutRouter,
    CommandForm
};

export const install = (Vue) => Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]));
