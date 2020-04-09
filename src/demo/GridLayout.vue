<template>
  <div>
    <div style="float:left">
      <slot name="actions"></slot>
    </div>
    <div style="float:left;margin-left:20px">
      <slot style="float:left" name="filters"></slot>
    </div>
    <div style="clear:both;"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>

