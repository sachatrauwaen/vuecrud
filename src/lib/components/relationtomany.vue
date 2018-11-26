<template>
<div>
    <el-select multiple @input="updateModel" :value="model" :value-key="relationValueField" filterable clearable v-on:clear="clear" remote :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in computedOptions" :key="item.value.id" :label="item.label" :value="item.value"></el-option>
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
  name: "oa-relation-to-many",

  props: {
    value: Array,
    schema: {},
    messages: Object,
    connector: {},
    resource: String,
    prop: String,
    label: String
  },
  data: function() {
    return {
      form: {},
      loading: false,
      dialogVisible: false,
      options: null
    };
  },
  computed: {
    relationResource() {
      return this.schema["x-rel-to-many-app"];
    },
    relationAction() {
      return (
        this.schema["x-rel-to-many-action"] ||
        "get" + Utils.capitalize(this.prop) + "s"
      );
    },
    relationValueField() {
      return this.schema["x-rel-to-many-valuefield"] || "id";
    },
    relationTextField() {
      return this.schema["x-rel-to-many-textfield"] || "fullName";
    },
    id() {
      return this.value ? this.value[this.relationValueField] : null;
    },
    isnew() {
      return !this.value;
    },
    // schema: function() {
    //    if (this.isnew)
    //        return jref.resolve(abp.schemas.app[this.resource].create.input).properties[this.prop];
    //    else
    //        return jref.resolve(abp.schemas.app[this.resource].update.input).properties[this.prop];
    // },
    model: {
      get() {
        return this.value || [];
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    isMobile() {
      return Utils.isMobile(window);
    },
    fullscreen() {
      return this.isMobile;
    },
    buttonIcon() {
      return this.isnew ? "el-icon-plus" : "el-icon-edit";
    },
    computedOptions() {
      var baseOptions = [];

      if (this.value) {
        baseOptions = this.value.map(
          function(t) {
            return {
              label: t[this.relationTextField],
              value: t
            };
          }.bind(this)
        );
      }
      if (this.options) {
        var retval = baseOptions.concat(this.options);
        // Remove duplicates
        retval = retval.filter(
          function(item, index, arr) {
            var firstIndex = arr.findIndex(
              function(element) {
                return (
                  element.value[this.relationValueField] ==
                  item.value[this.relationValueField]
                );
              }.bind(this)
            );
            if (firstIndex == index) return item;
          }.bind(this)
        );
        return retval;
      }

      if (baseOptions.length <= 0) return null;
      return baseOptions;
    }
  },
  methods: {
    remoteMethod(query) {
      const itemToOption = (item) => ({
        label: item[this.relationTextField],
        value: item
      });

      const onSuccess = (data) => {
        this.options = data.items.map(itemToOption);
        this.loading = false;
      }

      if (!query && self.value) {
        this.options = null;
      } else if (query && query !== "" && (!this.value || query != this.value[this.relationTextField])) {
        this.loading = true;
        this.connector.service(
          this.relationResource ? this.relationResource : this.resource,
          this.relationAction,
          query,
          onSuccess,
          () => {}
        );
      } else if (query == "") {
        this.options = null;
      }
    },
    clear() {
      this.model = null;
    },
    edit() {
      this.dialogVisible = true;
      if (this.$refs.form) this.$refs.form.fetchData();
    },
    handleClose(done) {
      done();
    },
    close(model) {
      this.dialogVisible = false;
      if (model) {
        this.model = model;
        this.options = null;
      }
    },
    updateModel(value) {
      this.model = value;
    },
    openDialog() {
      if (this.fullscreen) {
        document.body.classList.add("dialog-open");
      }
    },
    closeDialog() {
      if (this.fullscreen) {
        document.body.classList.remove("dialog-open");
      }
    }
  }
};
</script>
