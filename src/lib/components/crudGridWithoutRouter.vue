<template>
  <oa-grid-layout v-loading="loading">
    <template #actions>
      <el-button
        v-for="action in actions"
        :key="action.name"
        :icon="action.icon"
        size="small"
        :type="action.type"
        @click="action.execute()"
      >{{action.name}}</el-button>
    </template>
    <template #batchactions>
      <el-button
        v-for="action in batchActions"
        :key="action.name"
        :icon="action.icon"
        size="small"
        :type="action.type"
        @click="action.execute()"
      >{{action.name}}</el-button>
      <component v-for="(comp, index) in customBatchComponents" :key="index" :is="comp" :selections="selections" ></component>
    </template>
    <template #filters>
      <div v-if="hasAdvFilter">
        <oa-advfilter-form
          ref="advfilterform"
          :model="filterModel"
          :schema="filterSchema"
          :connector="connector"
          :actions="filterActions"
          :messages="messages"
          :resource="resource"
          @filterEager="filterEager"
        ></oa-advfilter-form>
      </div>
      <div v-else-if="hasFilter">
        <oa-filter-form
          ref="filterform"
          :model="filterModel"
          :schema="filterSchema"
          :connector="connector"
          :actions="filterActions"
          :messages="messages"
          :resource="resource"
          @filterEager="filterEager"
        ></oa-filter-form>
      </div>
    </template>
    <div class="oa-crud-grid">      
      <oa-grid
        ref="grid"
        :model="model"
        :schema="schema"
        :connector="connector"
        :resource="resource"
        :messages="messages"
        :actions="gridActions"
        :default-action="gridActions[0]"
        :locale="locale"
        :doOnSort="doOnSort"
        :getCustomActions="getCustomActions"
      ></oa-grid>
      <br />
      <div style="float:right;margin-bottom:10px;">
        <el-pagination
          @current-change="currentPageChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCount"
        ></el-pagination>
      </div>
      <div
        style="float:right;margin-bottom:10px;width: 80px; margin-left: 20px; margin-right: 20px;"
      >
        <el-select :value="pageSize" @input="onChangePageSize" placeholder="Select" size="mini">
          <el-option v-for="item in pageSizeOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
    </div>
  </oa-grid-layout>
</template>

<script>
//import { debounce } from "../utils/utils";
import Vue from "vue";
import { default as Utils } from "../utils/utils";
export default {
  name: "oa-crud-grid-without-router",
  data() {
    return {
      model: [],
      filterModel: {},
      totalCount: 0,
      currentPage: 1,
      debouncedFetchData: Utils.debounce(this.fetchData, 500),
      fetchDataId: 0, // Keeps track of the requests of the fetchData method, to track race conditions
      pageSize: 10,
      loading: true,
    };
  },
  props: {
    module: String,
    resource: String,
    connector: Object,
    entityType: {},
    doOnView: Function,
    doOnEdit: Function,
    doOnAdd: Function
  },
  computed: {
    selections() {
          if (this.$refs.grid)
              return this.$refs.grid.selections
          else
              return [];
    },
    // module() {
    //   return this.$route.params.module;
    // },
    // resource() {
    //   return this.$route.params.resource;
    // },
    // connector() {
    //   return this.$root.$options.connector;
    // },
    // pageSize() {
    // 	return this.connector.settings().defaultPageSize || 10;
    // },
    locale() {
      return this.connector.locale();
    },
    schema() {
      return this.connector.schema(this.resource, "get");
    },
    messages() {
      return this.connector.messages(this.module);
    },
    gridActions() {
        if (this.readOnly) {
            return [
                {
                    name: this.translate("View"),
                    icon: "el-icon-view",
                    execute: this.doOnView
                }
                ];
        } else {
            return [
                {
                    name: this.translate("Edit"),
                    icon: "el-icon-edit",
                    execute: this.doOnEdit
                },
                {
                    name: this.translate("Delete"),
                    icon: "el-icon-delete",
                    execute: row => {
                        // eslint-disable-next-line
                        this.$confirm("Confirm delete ?", this.translate("Delete"), {
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
                            .catch(() => { });
                    },
                    visible: row => {
                        return typeof row.canDelete !== "undefined" ? row.canDelete : true;
                    }
                },
                {
                    name: this.translate("Duplicate"),
                    icon: "el-icon-document-copy",
                    execute: row => {
                        // eslint-disable-next-line
                        this.$confirm("Confirm duplicate ?", this.translate("Duplicate"), {
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            type: "warning"
                        })
                            .then(() => {
                                this.duplicateData(row, () => {
                                    this.$message({
                                        type: "success",
                                        message: this.translate("Duplicate completed")
                                    });
                                });
                            })
                            .catch(() => { });
                    },
                    visible: row => {
                        return row.canDuplicate;
                    }
                }
            ];
        }
    },
    actions() {
        if (this.readOnly) {
            return [];
        } else {
              return [
                  {
                      icon: "el-icon-plus",
                      type: "primary",
                      execute: this.doOnAdd
                  }
              ];
        }
    },
    filterSchema() {
      var schema = {
        properties: {}
      };
      var action = this.connector.schema(this.resource, "filter").properties;
      for (var key in action) {
        if (key != "skipCount" && key != "maxResultCount" && key != "sorting" && key != "entityType") {
          schema.properties[key] = action[key];
        }
      }
      return schema;
    },
    hasFilter() {
      return (
        Object.keys(this.filterSchema.properties).filter(val => {
          return val != "search";
        }).length > 0
      );
    },
    hasAdvFilter() {
      return Object.keys(this.filterSchema.properties).indexOf("search") > -1;
    },
    filterActions() {
      let actions = [
        {
          icon: "el-icon-search",
          type: "primary",
          execute: () => {
            if (this.$refs.advfilterform) {
              this.$refs.advfilterform.hideForm();
            }
            this.fetchData();
          }
        },
        {
          icon: "el-icon-close",
          execute: () => {
            if (this.$refs.filterform) this.$refs.filterform.resetForm();
            if (this.$refs.advfilterform) {
              this.$refs.advfilterform.resetForm();
            }
            this.fetchData();
          }
        }
      ];
      return actions;
    },
    batchActions() {
      let actions = [];
      if (this.exportUrl && this.hasExportPermission) {
        actions.push({
          icon: "el-icon-download",
          execute: () => {
            let url = this.exportUrl + "?";
            Object.keys(this.filterModel).forEach((key) => {
              if (
                key != "skipCount" &&
                key != "maxResultCount" &&
                key != "sorting"
              ) {
                url = url + key + "=" + this.filterModel[key] + "&";
              }
            });
            window.location = url.substring(0, url.length - 1);
          }
        });
      }
      return actions;
    },
    options() {
      return null;
    },
    totalPages() {
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    pageSizeOptions() {
      return (
        this.connector.settings().pageSizeOptions || [10, 25, 50, 100, 500]
      );
    },
    exportUrl() {
      let filterSchema = this.connector.schema(this.resource, "filter");
      return filterSchema && filterSchema["x-export-url"];
    },
    readOnly() {
      let filterSchema = this.connector.schema(this.resource, "filter");
      return filterSchema && filterSchema["x-ui-readonly"];
    },
    exportPermisssion() {
      let filterSchema = this.connector.schema(this.resource, "filter");
      return filterSchema && filterSchema["x-export-permission"];
    },    
    hasExportPermission() {
      return !this.exportPermisssion || this.connector.hasPermission(this.exportPermisssion);
    },
    customBatchComponents() {
      let filterSchema = this.connector.schema(this.resource, "filter");
      let comps = filterSchema && filterSchema["x-ui-components"];
      if (comps) {
        return comps.split(',').map(type => {
          var compName = "oa-" + type;
          var comp = Vue.component(compName);
          if (!comp) {
            comp = (resolve, reject) => {
              Utils.loadComponent({
                name: compName,
                path: this.connector.componentsPath() + type + ".js",
                onLoad: resolve,
                onError: reject
              });
            };
          }
          return comp;
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    onChangePageSize(value) {
      this.pageSize = value;
      this.fetchData();
    },
    // eslint-disable-next-line
    doOnSort({ column, prop, order }) {
      const parsedOrder = order === "descending" ? " DESC" : "";
      const sorting = prop + parsedOrder;
      this.fetchData(undefined, sorting);
    },
    filterEager() {
      this.debouncedFetchData();
    },
    currentPageChange() {
      this.fetchData();
    },
    fetchData(callback, sorting = undefined) {
      this.loading = true;
      this.filterModel.sorting = sorting;
      this.filterModel.skipCount = (this.currentPage - 1) * this.pageSize;
      this.filterModel.maxResultCount = this.pageSize;
      if (this.entityType)this.filterModel.entityType=this.entityType;
      const requestId = ++this.fetchDataId;
      return this.connector
        .pService(this.resource, "getAll", this.filterModel)
        .then(data => {
          if (requestId !== this.fetchDataId) return; // This is not a response to the latest fetch data request, do nothing

          this.model = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;
        });
    },
    deleteData(data, callback) {
      this.loading = true;
      return this.connector
        .pService(this.resource, "delete", { id: data.id })
        .then(() => this.fetchData().then(callback));
    },
    duplicateData(data, callback) {
      this.loading = true;
      return this.connector
        .pService(this.resource, "duplicate", { id: data.id })
        .then(() => this.fetchData().then(callback));
    },
    translate(text) {
      if (this.messages && this.messages[text]) return this.messages[text];
      else return text;
    },
    // eslint-disable-next-line no-unused-vars
    getCustomActions(row, index) {
      // better name would have been getCustomComponents, vue Components
      if (row.customActions) {
        return row.customActions.map(type => {
          var compName = "oa-" + type;
          var comp = Vue.component(compName);
          if (!comp) {
            comp = (resolve, reject) => {
              Utils.loadComponent({
                name: compName,
                path: this.connector.componentsPath() + type + ".js",
                onLoad: resolve,
                onError: reject
              });
            };
          }
          return comp;
        });
      } else {
        return [];
      }
    }
  },
  created() {
    if (this.connector.settings().defaultPageSize)
      this.pageSize = this.connector.settings().defaultPageSize;

    for (var key in this.filterSchema.properties) {
      if (this.filterSchema.properties[key]["default"]) {
        //this.filterModel[key] = this.filterSchema.properties[key]["default"];
        this.$set(
          this.filterModel,
          key,
          this.filterSchema.properties[key]["default"]
        );
      }
    }
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
