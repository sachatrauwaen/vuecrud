<template>
<oa-form ref="form" :model="model" :schema="schema" :actions="actions" :messages="messages" :connector="connector" :resource="resource">
</oa-form>
</template>

<script>
import { default as Utils } from '../utils/utils'
export default {
  name: "oa-dialog-form",

  props: {
    resource: {},
    value: {},
    connector: Object
  },
  data: function() {
    var self = this;
    return {
      model: {},
      actions: [
        {
          name: "Save",
          type: "primary",
          execute: function() {
            self.$refs.form.validate(function(valid) {
              if (valid) {
                self.saveData(self.model, function() {
                  self.$message({
                    type: "success",
                    message: "Save completed"
                  });
                  self.$emit("close", self.model);
                });
              } else {
                return false;
              }
            });
          }
        },
        {
          name: "Cancel",
          execute: function() {
            self.$emit("close");
          }
        }
      ]
    };
  },
  computed: {
    id: function() {
      return this.value ? this.value[this.relationValueField] : null;
    },
    isnew: function() {
      return !this.value;
    },
    relationValueField: function() {
      return this.schema["x-rel-valuefield"] || "id";
    },
    schema: function() {
      if (this.isnew)
        return this.connector.schemas(this.resource, "create")
      else
        return this.connector.schemas(this.resource, "update")
    },
    messages: function() {
      return this.connector.messages();
    }
  },
  methods: {
    fetchData: function() {
      var self = this;
      self.$refs.form.resetForm();
      if (!this.isnew) {
        self.connector(
          self.resource,
          "get",
          {
            id: self.id
          },
          function(data) {
            self.model = data;
            // this.pagination.totalItems = data.total;
          },
          function() {
            // abp.ui.clearBusy(_$app);
          }
        );
      } else {
        self.model = {};
      }
    },
    saveData: function(data, callback) {
      var self = this;
      if (self.isnew) {
        // add
        self.connector(
          self.resource,
          "create",
          data,
          function(newdata) {
            self.model = newdata;
            self.$emit("input", newdata[this.relationValueField]);
            if (callback) callback();
          },
          function() {
            // abp.ui.clearBusy(_$app);
          }
        );
      } else {
        // update
        data.id = self.id;
        self.connector(
          self.resource,
          "update",
          data,
          function(newdata) {
            self.model = newdata;
            self.$emit("input", newdata.id);
            if (callback) callback();
          },
          function() {
            // abp.ui.clearBusy(_$app);
          }
        );
      }
    }
  },
  mounted: function() {
    this.fetchData();
  }
};
</script>
