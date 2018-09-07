<template>
<div>
    <el-row :gutter="10">
        <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2" style="padding-bottom: 20px;">
            <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
        </el-col>
        <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
            <oa-filter-form v-if="hasFilter" ref="filterform" :model="filterModel" :schema="filterSchema" :connector="connector" :actions="filterActions" :messages="messages"></oa-filter-form>
        </el-col>
    </el-row>
    <oa-grid :model="model" :schema="schema" :messages="messages" :options="options" :actions="gridActions" :default-action="gridActions[0]"></oa-grid><br />
    <div style="float:right;margin-bottom:10px;">
        <el-pagination @current-change="currentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount"></el-pagination>
    </div>
</div>
</template>

<script>
import VueForms from "../vueforms";

export default {
  name: "oa-crud-grid",
  data: function() {
    return {
      model: [],
      filterModel: {},
      totalCount: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    module: function() {
      return this.$route.params.module;
    },
    resource: function() {
      return this.$route.params.resource;
    },
    connector: function() {
      return this.$root.$options.connector;
    },
    schema: function() {
      return VueForms.jsonSchema.resolve(
        this.connector.schema(this.resource, "get")
      );
    },
    messages: function() {
      return this.connector.messages(this.$route.params.module);
    },
    gridActions: function() {
      var self = this;
      return [
        {
          name: self.translate("Edit"),
          icon: "el-icon-edit",
          execute: function(row) {
            self.$router.push({
              name: "edit",
              params: {
                resource: self.resource,
                id: row.id
              }
            });
          }
        },
        {
          name: self.translate("Delete"),
          icon: "el-icon-delete",
          execute: function(row) {
            // eslint-disable-next-line
            self
              .$confirm("Confirm delete ?", self.translate("Delete"), {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "warning"
              })
              .then(function() {
                self.deleteData(row, function() {
                  self.$message({
                    type: "success",
                    message: self.translate("Delete completed")
                  });
                });
              })
              .catch(function() {});
          },
          visible: function(row) {
            if (typeof row.canDelete !== "undefined") {
              return row.canDelete;
            } else {
              return true;
            }
          }
        }
      ];
    },
    defaultAction: function() {
      return this.gridActions[0];
    },
    actions: function() {
      var self = this;
      return [
        {
          // name: self.translate('Add'),
          icon: "el-icon-plus",
          type: "primary",
          execute: function() {
            self.$router.push({
              name: "add",
              params: {
                resource: self.resource
              }
            });
          }
        }
      ];
    },
    filterSchema: function() {
      var schema = {
        properties: {}
      };
      var action = this.connector.schema(this.resource, "filter").properties;
      for (var key in action) {
        if (key != "skipCount" && key != "maxResultCount") {
          schema.properties[key] = action[key];
        }
      }
      return schema;
    },
    hasFilter: function() {
      return Object.keys(this.filterSchema.properties).length > 0;
    },
    filterActions: function() {
      var self = this;
      return [
        {
          // name: self.translate('Search'),
          icon: "el-icon-search",
          type: "primary",
          execute: function() {
            self.fetchData();
          }
        },
        {
          // name: self.translate('Reset'),
          icon: "el-icon-close",
          execute: function() {
            self.$refs.filterform.resetForm();
            self.fetchData();
          }
        }
      ];
    },
    options: function() {
      /*
                      if (abp.grids.app[this.resource] && abp.grids.app[this.resource].options)
                          return abp.grids.app[this.resource].options;
                      else
                          return null;

                      var cols = [];
                      for (var key in this.schema.properties) {
                          cols.push(key);
                      }
                      */
      return null;
    },
    totalPages: function() {
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    currentPageChange: function() {
      this.fetchData(); 
    },
    fetchData: function(callback) {
      var self = this;
      self.filterModel.skipCount = (this.currentPage - 1) * this.pageSize;
      self.filterModel.maxResultCount = this.pageSize;
      // { skipCount: 0, maxResultCount: 999 }
      self.connector.service(
        this.resource,
        "getAll",
        self.filterModel,
        function(data) {
          self.model = data.items;
          self.totalCount = data.totalCount;
          if (callback) callback();
          // this.pagination.totalItems = data.total;
        },
        function() {
          // abp.ui.clearBusy(_$app);
        }
      );
    },
    deleteData: function(data, callback) {
      var self = this;
      self.connector.service(
        this.resource,
        "delete",
        {
          id: data.id
        },
        function() {
          self.fetchData(callback);
        },
        function() {
          // abp.ui.clearBusy(_$app);
        }
      );
    },
    translate: function(text) {
      if (this.messages && this.messages[text]) return this.messages[text];
      else return text;
    }
  },
  created: function() {
    console.error('I DID IT! <3 -- janne');
    console.warn('I DID IT! <3 -- janne');
    console.log('I DID IT! <3 -- janne');
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    // this.fetchGrid().then(() => { })
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: function() {
      this.fetchData();
    }
  }
};
</script>
