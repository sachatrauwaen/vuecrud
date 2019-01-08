<template>
	<oa-form ref="form" :model="model" :schema="schema" :actions="actions" :connector="connector" :messages="messages" ></oa-form>
</template>

<script>
// Form based on API endpoint (command-method) signature (input DTO).
export default {
    name: "oa-command-form",
    props: {
        resource: String,
        module: String,
        command: String,
        redirect: Function,
        initialModel: Object
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
                                message: "Save completed"
                            });
                            this.redirect();
                        };

                        const onValidate = valid => {
                            if (!valid) return;

                            this.saveData(this.model).then(onSaveData);
                        };

                        this.$refs.form.validate(onValidate);
                    }
                },
                {
                    name: "Cancel",
                    execute: () => {
                        this.redirect();
                    }
                }
            ]
        };
    },
    computed: {
        messages() {
            return this.connector.messages(this.module);
        },
        schema() {
            return this.connector.schema(this.resource, this.method);
        },
        connector: function() {
            return this.$root.$options.connector;
        }
    },
    methods: {
        saveData(data) {
            return this.connector.pService(this.resource, this.method, data);
        }
    },
    created() {
        this.model = this.initialModel || {};
    }
};
</script>
