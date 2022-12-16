<template>
    <div>
        <div style="line-height:40px;vertical-align:middle;font-weight:bold;">{{model}}</div>
    </div>
</template>
<script>
export default {
        name: "oa-displayenum",
        props: {
            value: {},
            schema: {},
            prop: String,
            options: {},
            messages: Object,
        },
        computed: {
            model() {
                if (this.messages && this.messages[this.value]) {
                    return this.messages[this.value];
                }
                return this.value;                
            }
        }
}
</script>

