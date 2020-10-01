<template>
  <div>
    <slot></slot>
    <div style="margin-left: 120px;">
      <div style="float:left;">
      <slot name="languages"></slot>
      </div>
      <div style="float:left;margin-left:10px;">
      <slot name="actions"></slot>
      </div>
    <div style="clear:both;"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

