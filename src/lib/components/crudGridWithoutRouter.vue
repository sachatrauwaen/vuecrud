<template>
	<div class="oa-crud-grid">
		<el-row :gutter="10">
			<el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2" style="padding-bottom: 20px;">
				<el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" :type="action.type" @click="action.execute()">{{action.name}}</el-button>
			</el-col>
			<el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
				<oa-filter-form
					v-if="hasFilter"
					ref="filterform"
					:model="filterModel"
					:schema="filterSchema"
					:connector="connector"
					:actions="filterActions"
					:messages="messages"
					@filterEager="filterEager"></oa-filter-form>
			</el-col>
		</el-row>
		<oa-grid :model="model" :schema="schema" :messages="messages" :options="options" :actions="gridActions" :default-action="gridActions[0]" :locale="locale" :onSort="onSort"></oa-grid><br />
		<div style="float:right;margin-bottom:10px;">
			<el-pagination @current-change="currentPageChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount"></el-pagination>
		</div>
	</div>
</template>

<script>
import { debounce } from '../utils/utils'
export default {
	name: "oa-crud-grid-without-router",
	data() {
		return {
			model: [],
			filterModel: {},
			totalCount: 0,
			currentPage: 1,
			debouncedFetchData: debounce(this.fetchData, 500),
			fetchDataId: 0 // Keeps track of the requests of the fetchData method, to track race conditions
		};
	},
	props: {
		module: String,
		resource: String,
		connector: Object,
		doOnEdit: Function,
		doOnAdd: Function
	},
	computed: {
		// module() {
		//   return this.$route.params.module;
		// },
		// resource() {
		//   return this.$route.params.resource;
		// },
		// connector() {
		//   return this.$root.$options.connector;
		// },
		pageSize() {
			return this.connector.settings().pageSize || 10;
		},
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
			return [
				{
					name: this.translate("Edit"),
					icon: "el-icon-edit",
					execute: this.doOnEdit
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
						return typeof row.canDelete !== "undefined"
							? row.canDelete
							: true;
					}
				}
			];
		},
		defaultAction() {
			return this.gridActions[0];
		},
		actions() {
			return [
				{
					icon: "el-icon-plus",
					type: "primary",
					execute: this.doOnAdd
				}
			];
		},
		filterSchema() {
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
		hasFilter() {
			return Object.keys(this.filterSchema.properties).length > 0;
		},
		filterActions() {
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
		options() {
			return null;
		},
		totalPages() {
			return Math.ceil(
				this.pagination.totalItems / this.pagination.rowsPerPage
			);
		}
	},
	methods: {
		// eslint-disable-next-line
		onSort({ column, prop, order }) {
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
			this.filterModel.sorting = sorting;
			this.filterModel.skipCount = (this.currentPage - 1) * this.pageSize;
			this.filterModel.maxResultCount = this.pageSize;
			// this.connector.service(
			// 	this.resource,
			// 	"getAll",
			// 	this.filterModel,
			// 	(data) => {
			// 		this.model = data.items;
			// 		this.totalCount = data.totalCount;
			// 		if (callback) callback();
			// 	},
			// 	() => {}
			// );
			const requestId = ++this.fetchDataId;
			return this.connector
				.pService(this.resource, 'getAll', this.filterModel)
				.done(data => {
					if(requestId !== this.fetchId)
						return; // This is not a response to the latest fetch data request, do nothing
						
					this.model = data.items;
					this.totalCount = data.totalCount;
				});
		},
		deleteData(data, callback) {
			this.connector
				.pService(this.resource, "delete", { id: data.id })
				.done(() => this
					.fetchData()
					.done(callback)
				);
		},
		translate(text) {
			if (this.messages && this.messages[text])
				return this.messages[text];
			else
				return text;
		}
	},
	created() {
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
