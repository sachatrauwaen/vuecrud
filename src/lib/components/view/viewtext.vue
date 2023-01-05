<template>
    <div>
        <div v-if="schema.type=='boolean'" :class="{NormalData:true,BoldData:!hideLabel}">{{model ? 'Ja': 'Nee' }}</div>
        <div v-html="model" :class="{NormalData:true,BoldData:!hideLabel}"></div>
    </div>

</template>
<script>
    export default {
        name: "oa-display",

        props: {
            value: {},
            schema: {},
            prop: String,
            options: {}
        },
        computed: {
            model() {
                return this.value ? this.value.split("\n").join("<br />") : "";
            },
            hideLabel() {
                return this.schema["x-ui-hideLabel"];
            },

        }
    }
</script>
<style>
    .NormalData {
        line-height: 40px;
        vertical-align: middle;
        font-weight: bold;
    }

    .BoldData {
        line-height: 40px;
        vertical-align: middle;
        font-weight: bold;
    }
</style>

