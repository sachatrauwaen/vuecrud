<template>
<div>    
    <a href="#/app/user">Users</a>
    <hr />
    <h1>{{title}}</h1>
    <slot></slot>
</div>
</template>
<script>
export default {
    name:'layout',
    props:['title']
}
</script>

