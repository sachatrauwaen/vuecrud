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
  name: "oa-settings-form",
  props: {    
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
              // Refresh data
              this.fetchData();
          },
        },
      ]      
    };
  },
  computed: {
    resource() {
        return this.$route.params.resource;
    },
    module() {
        return this.$route.params.module;
    },
    id() {
        return this.$route.params.id;
    },
    language() {
        return this.$route.params.lang;
    },

    messages() {
      return this.connector.messages(this.module);
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
        if (this.isMultiLingual) {
          this.connector
            .pService(this.resource, "get", {
              entityType: this.entityType ,
              language: this.language,
            })
            .then((data) => (this.model = data));
        } else {
          this.connector
              .pService(this.resource, "get", { entityType: this.entityType })
            .then((data) => (this.model = data));
        }
    },
    saveData(data) {
      if (this.isMultiLingual) {
        data.language = this.language;
      }
      if (this.entityType) {
        data.entityType = this.entityType;
      }
      return this.connector.pService(this.resource, "update", data);
    }
  },
  created() {
    //this.language = this.locale;
    this.fetchData();
  }
};
</script>
