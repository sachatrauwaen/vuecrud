<template>
    <oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :resource="resource" :messages="messages" ></oa-form>
</template>

<script>
export default {
  name: 'oa-crud-form',
  props: {
      resource: String,
      redirect: Function
  },
  data () {
    var self = this
    return {
      model: {},
      actions: [
        {
          name: 'Save',
          type: 'primary',
          execute:  () => {
            const onSaveData = () => {
                this.$message({
                    type: 'success',
                    message: 'Save completed'
                });
                this.redirect();
                //this.$router.go(-1); // go back
            };

            const validate = (valid) => {
                if (valid) this.saveData(this.model, onSaveData);
                else       return false;
            };

            this.$refs.form.validate(validate);
          }
        },
        {
          name: 'Cancel',
          execute: () => {
              this.redirect();
              //this.$router.go(-1); // go back
          }
        }
      ]
    }
  },
  computed: {
    module () {
      // TODO extract route dependency
      return this.$route.params.module
    },
    // resource () {
    //   return this.$route.params.resource
    // },
    messages () {
      return this.connector.messages(this.$route.params.module);
    },
    id () {
      return this.$route.params.id
    },
    isnew () {
      return !this.id
    },
    schema () {
      if (this.isnew)
        return this.connector.schema(this.resource,'create');
      else
        return this.connector.schema(this.resource,'update')
    },
    options () {
      return null
    },
    connector: function () {
      return this.$root.$options.connector;
    }
  },
  methods: {
    fetchData () {
      var self = this
      if (!this.isnew) {
        self.connector.service(this.resource,'get',{ id: self.id },
          function (data) {
            self.model = data
          },
          function () {
          })
      }
    },
    saveData (data, callback) {
      var self = this
      if (self.isnew) {
        // add
        self.connector.service(
          this.resource,
          'create',
          data,
          callback ? callback : (() => {}),
          () => {}
        );
      } else {
        // update
        data.id = self.id
        self.connector.service(
          this.resource,
          'update',
          data,
          callback ? callback : (() => {}),
          () => {}
        );
      }
    }
  },
  created () {
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    // this.fetchGrid().then(() => { })
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    // TODO remove route dependency
    $route: function () {
      this.fetchData()
    }
  }
}
</script>
