<template>
<div>
    <el-select v-model="model" :value-key="relationValueField" filterable clearable v-on:clear="clear" remote :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in options" :key="item.value.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button v-if="relationResource" :icon="buttonIcon" v-on:click="edit"></el-button>
    <slot name="footer"></slot>
    <el-dialog v-if="relationResource" ref="customerDialog" title="Client" :visible.sync="dialogVisible" :fullscreen="fullscreen" :before-close="handleClose" :append-to-body="true" @open="openDialog" @close="closeDialog">
        <oa-dialog-form ref="form" :resource="relationResource" v-model="model" v-on:close="close"></oa-dialog-form>
    </el-dialog>
</div>
</template>

<script>
import { default as Utils } from '../utils/utils'
export default {
  name: 'oa-relation',

  props: {
    value: {},
    schema: {},
    messages: Object,
    connector: {},
    appService: {},
    prop: String,
    label: String
  },
  data () {
    return {
      form: {},
      loading: false,
      dialogVisible: false,
      options: []
    }
  },
  computed: {
    sch () {
      return this.schema.oneOf && this.schema.oneOf[0] ? this.schema.oneOf[0] : this.schema
    },
    relationResource () {
      return this.sch['x-rel-app']
    },
    relationAction () {
      return this.sch['x-rel-action'] || 'get' + Utils.capitalize(this.prop) + 's'
    },
    relationValueField () {
      return this.sch['x-rel-valuefield'] || 'id'
    },
    relationTextField () {
      return this.sch['x-rel-textfield'] || 'fullName'
    },
    id () {
      return this.value ? this.value[this.relationValueField] : null
    },
    isnew () {
      return !this.value
    },
    // schema: function() {
    //    if (this.isnew)
    //        return jref.resolve(abp.schemas.app[this.resource].create.input).properties[this.prop];
    //    else
    //        return jref.resolve(abp.schemas.app[this.resource].update.input).properties[this.prop];
    // },
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    isMobile () {
      return Utils.isMobile(window);
    },
    fullscreen () {
      return this.isMobile
    },
    buttonIcon () {
      return this.isnew ? 'el-icon-plus' : 'el-icon-edit'
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.options = [{
          label: this.value[this.relationTextField],
          value: val
        }]
      }
    }
  },
  methods: {
    remoteMethod (query) {
      if (!query && this.value) {
        const option = {
          label: this.value[this.relationTextField],
          value: this.value
        };
        this.options.push(option);
      } else if (query && query !== '' && (!this.value || query != this.value[this.relationTextField])) {
        this.loading = true;        
        this.connector.service(
          this.appService,
          this.relationAction,
          query,
          (data) => {
            this.options = data.items.map(t => {
              return {
                label: t[this.relationTextField],
                value: t
              }
            })
            this.loading = false
          },
          () => {}
        );
      } else if (query == '') {
        this.options = []
      }
    },
    clear () {
      this.model = null;
    },
    edit () {
      this.dialogVisible = true
      if (this.$refs.form) this.$refs.form.fetchData()
    },
    handleClose (done) {
      done()
    },
    close (model) {
      this.dialogVisible = false
      if (model) {
        this.model = model
        this.options = [
          {
            label: model[this.relationTextField],
            value: model
          }
        ]
      }
    },
    openDialog () {
      if (this.fullscreen) {
        document.body.classList.add('dialog-open')
      }
    },
    closeDialog () {
      if (this.fullscreen) {
        // document.body.style.position = ''; // for ios cursor bug
        document.body.classList.remove('dialog-open')
      }
    }
  },
  created () {
    if (this.value) {
      this.options = [
        {
          label: this.value[this.relationTextField],
          value: this.value
        }
      ]
    }
  }
}
</script>
