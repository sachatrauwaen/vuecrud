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
import { default as Utils } from '../utils/utils'
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
      return this.connector.schema(this.resource, "get")
    },
    messages: function() {
      return this.connector.messages(this.$route.params.module);
    },
    gridActions: function() {
      return [
        {
          name: this.translate("Edit"),
          icon: "el-icon-edit",
          execute: (row) => {
            this.$router.push({
              name: "edit",
              params: {
                resource: this.resource,
                id: row.id
              }
            });
          }
        },
        {
          name: this.translate("Delete"),
          icon: "el-icon-delete",
          execute: (row) => {
            // eslint-disable-next-line
            this
              .$confirm("Confirm delete ?", this.translate("Delete"), {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "warning"
              })
              .then(() => {
                this.deleteData(row, () => {
                  this.$message({
                    type: "success",
                    message: this.translate("Delete completed")
                  });
                });
              })
              .catch(() => {});
          },
          visible: (row) => {
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
      return [
        {
          icon: "el-icon-plus",
          type: "primary",
          execute: () => {
            this.$router.push({
              name: "add",
              params: {
                resource: this.resource
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
      return [
        {
          icon: "el-icon-search",
          type: "primary",
          execute: () => {
            this.fetchData();
          }
        },
        {
          icon: "el-icon-close",
          execute: () => {
            this.$refs.filterform.resetForm();
            this.fetchData();
          }
        }
      ];
    },
    options: function() {
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
      this.filterModel.skipCount = (this.currentPage - 1) * this.pageSize;
      this.filterModel.maxResultCount = this.pageSize;
      this.connector.service(
        this.resource,
        "getAll",
        this.filterModel,
        (data) => {
          this.model = data.items;
          this.totalCount = data.totalCount;
          if (callback) callback();
        },
        () => {}
      );
    },
    deleteData: function(data, callback) {
      this.connector.service(
        this.resource,
        "delete",
        {
          id: data.id
        },
        () => {
          this.fetchData(callback);
        },
        () => {}
      );
    },
    translate: function(text) {
      if (this.messages && this.messages[text])
        return this.messages[text];
      else
        return text;
    }
  },
  created: function() {
    this.fetchData();
  },
  watch: {
    // Call the method again whenever the route changes
    $route: function() {
      this.fetchData();
    }
  }
};
</script>
