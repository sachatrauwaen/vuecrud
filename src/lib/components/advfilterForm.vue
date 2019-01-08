<template>
<div>
  <el-input v-model="model.search" placeholder="Search" class="input-with-select" @input="filterEager" prefix-icon="el-icon-search">
    <i slot="suffix" v-if="hasFilter" class="el-input__icon el-icon-more" @click="advsearch=!advsearch"></i>
  </el-input>
  <el-popover placement="bottom" trigger="manual" v-model="advsearch">
    <oa-filter-form
      ref="filterform"
      :model="model"
      :schema="schema"
      :connector="connector"
      :actions="actions"
      :messages="messages"
       :resource="resource"
      @filterEager="filterEager"></oa-filter-form>						
  </el-popover>
</div>          
</template>

<script>
import { default as Utils } from "../utils/utils";
export default {
    name: "oa-advfilter-form",
    props: {
        model: {},
        schema: {},
        connector: {},
        options: {},
        messages: {},
        actions: {},
        columns: {},
        resource: String
    },
    data() {
        return {
            advsearch: false
        };
    },
    computed: {
        isMobile() {
            return Utils.isMobile(window);
        }
    },
    methods: {
        resetForm() {
            this.$refs.filterform.resetForm();
            this.advsearch = false;
        },
        hideForm() {
            this.advsearch = false;
        },
        filterEager() {
            this.$emit("filterEager", this.model);
        },
        hasFilter() {
            return (
                Object.keys(this.schema.properties).filter(val => {
                    return val != "search";
                }).length > 0
            );
        }
    }
};
</script>
