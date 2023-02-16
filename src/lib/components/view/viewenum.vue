<template>
    <div>
        <div style="line-height:40px;vertical-align:middle;font-weight:bold;">{{model}}</div>
    </div>
</template>
<script>
export default {
        name: "oa-viewenum",
        props: {
            value: {},
            schema: {},
            prop: String,
            options: {},
            messages: Object,
        },
        computed: {
            model() {
                if (this.schema.enum) {
                    let idx = this.schema.enum.indexOf(this.value);
                    let label = this.schema["x-enumNames"]
                        ? this.schema["x-enumNames"][idx]
                        : this.prop + "_" + this.value;

                    if (this.messages && this.messages[label]) {
                        label = this.messages[label];
                    }
                    return label;
                }
                //if (this.messages && this.messages[this.value]) {
                //    return this.messages[this.value];
                //}
                return this.value;                
            }
        }
}
</script>

