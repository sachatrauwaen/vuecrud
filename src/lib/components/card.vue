<template>
    <div>    
        <el-card  style="margin-bottom:10px;" >
            <oa-fields :model="model" :schema="schema" :connector="connector" :messages="messages" :resource="resource" :parent-model="parentModel"></oa-fields>
        </el-card>
    </div>
</template>

<script>

import { default as Utils } from "../utils/utils";

export default {
  name: "oa-card",
  props: {
    value: {},
    schema: {},
    messages: Object,
    resource: String,
    prop: String,
    connector: {},
    parentModel:{}
  },
  data() {
    return {
     
    };
  },
  computed: {
    locale() {
      return this.connector.locale();
    },
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },   
    isMobile() {
      return Utils.isMobile(window);
    }
  },
  created() {},
  methods: {
    translate(text) {
      if (this.messages && this.messages[text]) return this.messages[text];
      else return text;
    }    
  }
};
</script>
