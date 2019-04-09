<template>
    <div>    
        <el-card  style="margin-bottom:10px;" v-for="row in model" :key="row.id">
            <oa-fields :model="row" :schema="rowSchema" :connector="connector" :messages="messages" :resource="resource" :parent-model="parentModel"></oa-fields>
            <div style="padding-top:10px;">
                <el-button v-for="action in actions" :key="action.name" :icon="action.icon" size="small" @click="action.execute(row)"></el-button>
            </div>
        </el-card>
        <div style="padding-top:10px;" v-if="!model || !model.length">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addRow()" style="margin:10px auto;display:block"></el-button>
        </div>    
    </div>
</template>

<script>
import Vue from "vue";
import { default as Utils } from "../utils/utils";

export default {
  name: "oa-cards",
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
      actions: [
        {
          name: this.translate("Delete"),
          icon: "el-icon-delete",
          execute: row => {
            var index = this.model.indexOf(row);
            if (index > -1) {
              this.model.splice(index, 1);
            }
          }
        },
        {
          name: this.translate("Add"),
          icon: "el-icon-plus",
          execute: row => {
            this.addRow();
          }
        },
        /*
        {
          name: this.translate("Duplicate"),
          icon: "el-icon-plus",
          execute: row => {
            var clone = JSON.parse(JSON.stringify(row));
            if (clone.hasOwnProperty("id")) {
              delete clone.id;
            }
            this.model.push(clone);
          }
        }
        */
      ]
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
    rowSchema() {
      return this.schema.items;
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
    },
    addRow() {
      const properties = this.schema.items.properties;
      const row = Object.keys(properties).reduce(
        (row, property) => ({
          ...row,
          [property]: properties[property].default
        }),
        {}
      );
      this.model = this.model ? [...this.model, row] : [row];
      
      
    }
  }
};
</script>
