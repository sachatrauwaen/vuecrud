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
      modified: false, // Track if the form has been modified
    };
  },
  computed: {
      actions() {
          if (this.readOnly) {
              return [                  
                  {
                      name: this.translate("Close"),
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
                      name: this.translate("Save"),
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
                      name: this.translate("Cancel"),
                      execute: () => {
                          if (this.modified) {
                              this.$confirm(
                                  this.translate("Confirm Cancel ?"),
                                  this.translate("Warning"),
                                  {
                                      confirmButtonText: this.translate("Yes"),
                                      cancelButtonText: this.translate("No"),
                                      type: "warning",
                                  }
                               )
                                  .then(() => {
                                      this.redirect();
                                     
                                  })
                                  .catch(() => {
                                      // Do nothing, user cancelled
                                  });
                          } else {
                              this.redirect();
                          }
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
                    this.modified = false; // Reset modified state on fetch
                });                
            })
            .always(() => {
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
                  this.$nextTick(() => {                     
                      this.modified = false; // Reset modified state on fetch
                  });
              })
              .always(() => {
                  this.loading = false;
              });
        } else {
          this.connector
            .pService(this.resource, "get", { id: this.id })
              .then((data) => {
                  this.model = data;
                  this.$nextTick(() => {
                      this.modified = false; // Reset modified state on fetch
                  });
              })
                .always(() => {
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
        
        })
        .always(() => {
            this.loading = false;
        });
    },
    update(data) {
      this.loading = true;
      data.id = this.id; // TODO is this line necessary?
        return this.connector.pService(this.resource, "update", data).then(() => {            
            
    })
    .always(() => {
        this.loading = false;
    });
    },
    translate(text) {
        if (this.messages && this.messages[text]) return this.messages[text];
        else return text;
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
    },
    model: {
        handler() {
            this.modified = true; // Set modified to true when model changes
        },
        deep: true
    }
  }
};
</script>
