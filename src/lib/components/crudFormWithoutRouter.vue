<template>
  <oa-form
    ref="form"
    :model="model"
    :schema="schema"
    :actions="actions"
    :connector="connector"
    :resource="resource"
    :messages="messages"
    :language="language"
    @changeLanguage="changeLanguage"
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
      actions: [
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
      ],
      language: "",
    };
  },
  computed: {
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
      if (this.isnew) return this.connector.schema(this.resource, "create");
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
  },
  methods: {
    changeLanguage(language) {
      this.language = language;
      this.fetchData();
    },
    fetchData() {
      if (this.isnew) {
        this.connector
            .pService(this.resource, "init", { entityType: this.entityType })
            .then((data) => (this.model = data));
      } else {
        if (this.isMultiLingual) {
          this.connector
            .pService(this.resource, "get", {
              id: this.id,
              language: this.language,
            })
            .then((data) => (this.model = data));
        } else {
          this.connector
            .pService(this.resource, "get", { id: this.id })
            .then((data) => (this.model = data));
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
      return this.connector.pService(this.resource, "create", data);
    },
    update(data) {
      data.id = this.id; // TODO is this line necessary?
      return this.connector.pService(this.resource, "update", data);
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
