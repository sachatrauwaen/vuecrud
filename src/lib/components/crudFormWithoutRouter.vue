<template>
  <oa-form
    ref="form"
    v-loading="loading"
    :model="model"
    :schema="schema"
    :actions="actions"
    :connector="connector"
    :resource="resource"
    :messages="messages"
    :language="language"
    @changeLanguage="changeLanguage"
    :readOnly="readOnly"
  ></oa-form>
</template>

<script>
export default {
  name: "oa-crud-form-without-router",
  props: {
    resource: String,
    module: String,
    redirect: Function,
    id: [String, Number],
  },
  data() {
    return {
      model: {},
      loading: true,
      language: "",
    };
  },
  computed: {
      actions() {
          if (this.readOnly) {
              return [                  
                  {
                      name: "Close",
                      type: "primary",
                      execute: () => {
                          this.redirect();
                          //this.$router.go(-1); // go back
                      },
                  },
              ];
          } else {
              return [
                  {
                      name: "Save",
                      type: "primary",
                      execute: () => {
                          const onSaveData = () => {
                              this.$message({
                                  type: "success",
                                  message: "Save completed",
                              });
                              this.redirect();
                              //this.$router.go(-1); // go back

                              // Refresh data
                              this.fetchData();
                          };

                          const onValidate = (valid) => {
                              if (valid) this.saveData(this.model).then(onSaveData);
                              else return false;
                          };

                          this.$refs.form.validate(onValidate);
                      },
                  },
                  {
                      name: "Cancel",
                      execute: () => {
                          this.redirect();
                          //this.$router.go(-1); // go back
                      },
                  },
              ];
          }

      },
    // module () {
    //   return this.$route.params.module
    // },
    // resource () {
    //   return this.$route.params.resource
    // },
    messages() {
      return this.connector.messages(this.module);
    },
    // id () {
    //   return this.$route.params.id
    // },
    isnew() {
      return !this.id;
    },
    schema() {
      if (this.readOnly) return this.connector.schema(this.resource, "get");
      else if (this.isnew) return this.connector.schema(this.resource, "create");
      else return this.connector.schema(this.resource, "update");
    },
    connector: function () {
      return this.$root.$options.connector;
    },
    entityType: function () {
      return this.$root.$options.entityType;
    },
    locale() {
      return this.connector.locale();
    },
    isMultiLingual() {
      return this.schema && this.schema["x-multi-language"];
    },
    readOnly() {
      let filterSchema = this.connector.schema(this.resource, "filter");
      return filterSchema && filterSchema["x-ui-readonly"];
    },
  },
  methods: {
    changeLanguage(language) {
      this.language = language;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      if (this.isnew) {
        this.connector
            .pService(this.resource, "init", { entityType: this.entityType })
            .then((data) => {
                this.model = data;
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                });
                this.loading = false;
            });
      } else {
        if (this.isMultiLingual) {
          this.connector
            .pService(this.resource, "get", {
              id: this.id,
              language: this.language,
            })
              .then((data) => {
                  this.model = data;
                  this.loading = false;
              });
        } else {
          this.connector
            .pService(this.resource, "get", { id: this.id })
              .then((data) => {
                  this.model = data;
                  this.loading = false;
              });
        }
      }
    },
    saveData(data) {
      if (this.isnew) return this.add(data);
      else return this.update(data);
    },
    add(data) {
      if (this.isMultiLingual) {
        data.language = this.language;
      }
      if (this.entityType) {
        data.entityType = this.entityType;
      }
      this.loading = true;
      return this.connector.pService(this.resource, "create", data).then(() => {
        this.loading = false;
      });
    },
    update(data) {
      this.loading = true;
      data.id = this.id; // TODO is this line necessary?
        return this.connector.pService(this.resource, "update", data).then(() => {            
            this.loading = false;
        });
    },
  },
  created() {
    this.language = this.locale;
    this.fetchData();
  },
  watch: {
    // TODO this seems suboptimal, and won't work when using without router
    $route: function() {
      this.fetchData();
    }
  }
};
</script>
