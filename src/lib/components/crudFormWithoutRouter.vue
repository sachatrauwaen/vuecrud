<template>
		<oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :appService="resource" :messages="messages" ></oa-form>
</template>

<script>
export default {
	name: 'oa-crud-form-without-router',
	props: {
		resource: String,
		module: String,
		redirect: Function,
		id: [String, Number]
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
							
							// Refresh data
							this.fetchData();
						};

						const onValidate = (valid) => {
							if (valid)
								this.saveData(this.model)
									.then(onSaveData);
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
			return !this.id;
		},
		schema () {
			if (this.isnew)
				return this.connector.schema(this.resource,'create');
			else
				return this.connector.schema(this.resource,'update');
		},
		connector: function () {
			return this.$root.$options.connector;
		}
	},
	methods: {
		fetchData () {
			if (this.isnew) return;

			this.connector
				.pService(this.resource, 'get', { id: this.id })
				.then(data => this.model = data);
		},
		saveData (data) {
			if (this.isnew)
				return this.add(data);
			else
				return this.update(data);
		},
		add (data) {
			return this.connector.pService(
				this.resource,
				'create',
				data
			);
		},
		update (data) {
			data.id = this.id; // TODO is this line necessary?
			return this.connector.pService(
				this.resource,
				'update',
				data
			);
		}
	},
	created () {
		this.fetchData()
	}
}
</script>
