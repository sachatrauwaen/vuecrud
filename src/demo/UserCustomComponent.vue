<template>
<el-button @click="impersonate">Impersonate</el-button>
</template>

<script>
export default {
    name: 'oa-user-custom-component',  
    props:{
        fullName:{}

    }, 
    data() {
        return {
    
        }
    },
    methods:{
        impersonate(){
            alert('impersonate '+ this.fullName);
        }

    }
}
</script>

<style>
</style>
