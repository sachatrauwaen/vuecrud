<template>
    <div>
        <div v-if="schema.type=='boolean'" style="line-height:40px;vertical-align:middle;font-weight:bold;">{{model ? 'Ja': 'Nee' }}</div>
        <div v-html="model" style="line-height:40px;vertical-align:middle;font-weight:bold;"></div>
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
            }
        }
}
</script>

