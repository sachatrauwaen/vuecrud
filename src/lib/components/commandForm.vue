<template>
	<oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :messages="messages" ></oa-form>
</template>

<script>
// Form based on API endpoint (method) signature (input DTO).
export default {
	name: 'oa-command-form',
	props: {
		appService: String,
		module: String,
		method: String,
		redirect: Function,
		initialModel: Object
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
						};

						const onValidate = (valid) => {
							if (!valid) return;

							this.saveData(this.model)
								.done(onSaveData);
						};

						this.$refs.form.validate(onValidate);
					}
				},
				{
					name: 'Cancel',
					execute: () => {
						this.redirect();
					}
				}
			]
		}
	},
	computed: {
		messages () {
			return this.connector.messages(this.module);
		},
		schema () {
			return this.connector.schema(this.appService, this.method);
		},
		connector: function () {
			return this.$root.$options.connector;
		}
	},
	methods: {
		saveData (data) {
			return this.connector.pService(this.appService, this.method, data);
		}
	},
	created () {
		this.model = this.initialModel || {};
	}
}
</script>
