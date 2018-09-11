<template>
    <oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :resource="resource" :messages="messages" ></oa-form>
</template>

<script>
import { default as Utils } from '../utils'
export default {
  name: 'oa-crud-form',
  props: {},
  data: function () {
    var self = this
    return {
      model: {},
      actions: [
        {
          name: 'Save',
          type: 'primary',
          execute: function () {
            self.$refs.form.validate(function (valid) {
              if (valid) {
                self.saveData(self.model, function () {
                  self.$message({
                    type: 'success',
                    message: 'Save completed'
                  })
                  self.$router.push({
                    name: 'grid',
                    params: { resource: self.resource }
                  })
                })
              } else {
                return false
              }
            })
          }
        },
        {
          name: 'Cancel',
          execute: function () {
            self.$router.push({
              name: 'grid',
              params: { resource: self.resource }
            })
          }
        }
      ]
    }
  },
  computed: {
    module: function () {
      return this.$route.params.module
    },
    resource: function () {
      return this.$route.params.resource
    },
    messages: function () {
      return this.connector.messages(this.$route.params.module);
    },
    id: function () {
      return this.$route.params.id
    },
    isnew: function () {
      return !this.id
    },
    schema: function () {
      if (this.isnew) {
        return Utils.jsonSchema.resolve(
          this.connector.schema(this.resource,'create')
        )
      } else {
        return Utils.jsonSchema.resolve(
          this.connector.schema(this.resource,'update')
        )
      }
    },
    options: function () {
      /*
                if (abp.forms.app[this.resource] && abp.forms.app[this.resource].options)
                    return abp.forms.app[this.resource].options;
                else
                */
      return null
    },
    connector: function () {
      return this.$root.$options.connector;
    }
  },
  methods: {
    fetchData: function () {
      var self = this
      if (!this.isnew) {
        self.connector.service(this.resource,'get',{ id: self.id },
          function (data) {
            self.model = data
            // this.pagination.totalItems = data.total;
          },
          function () {
            // abp.ui.clearBusy(_$app);
          })
      }
    },
    saveData: function (data, callback) {
      var self = this
      if (self.isnew) {
        // add
        self.connector.service(this.resource,'create',data,
          function () {
            if (callback) callback()
            // this.pagination.totalItems = data.total;
          },function () {
            // abp.ui.clearBusy(_$app);
          });
      } else {
        // update
        data.id = self.id
        self.connector.service(this.resource,'update',data,
          function () {
            if (callback) callback()
            // this.pagination.totalItems = data.total;
          },function () {
            // abp.ui.clearBusy(_$app);
          });
      }
    }
  },
  created: function () {
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    // this.fetchGrid().then(() => { })
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    $route: function () {
      this.fetchData()
    }
  }
}
</script>
