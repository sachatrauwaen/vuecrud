<template>
    <div>
        <div style="line-height:40px;vertical-align:middle;font-weight:bold;">{{model ? 'Ja': 'Nee' }}</div>
        
    </div>

</template>
<script>
export default {
        name: "oa-displayboolean",

        props: {
            value: {},
            schema: {},
            prop: String,
            options: {}
        },
        computed: {
            model() {
                return this.value;                
            }
        }
}
</script>

