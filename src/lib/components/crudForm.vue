<template>
		<oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :resource="resource" :messages="messages" ></oa-form>
</template>

<script>
export default {
	name: 'oa-crud-form',
	props: {
		resource: String,
		module: String,
		redirect: Function,
		id: String
	},
	data () {
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

						const onValidate = (valid) => {
							if (valid)
								this.saveData(this.model, onSaveData);
							else
								return false;
						};

						this.$refs.form.validate(onValidate);
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
		// module () {
		//   return this.$route.params.module
		// },
		// resource () {
		//   return this.$route.params.resource
		// },
		messages () {
			return this.connector.messages(this.module);
		},
		// id () {
		//   return this.$route.params.id
		// },
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
			if (!this.isnew) {
				this.connector.service(
					this.resource,
					'get',
					{ id: this.id },
					(data) => this.model = data,
					() => {}
				)
			}
		},
		saveData (data, callback) {
			if (this.isnew)
				this.add(data, callback);
			else
				this.update(data, callback);

			// Refresh data
			this.fetchData();
		},
		add (data, callback) {
			this.connector.service(
				this.resource,
				'create',
				data,
				callback || (() => {}),
				() => {}
			);
		},
		update (data, callback) {
			data.id = this.id
			this.connector.service(
				this.resource,
				'update',
				data,
				callback || (() => {}),
				() => {}
			);
		}
	},
	created () {
		this.fetchData()
	}
}
</script>
