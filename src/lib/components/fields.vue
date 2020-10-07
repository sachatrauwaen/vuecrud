<template>
  <div>
    <el-tabs v-if="Object.keys(tabs).length > 1" :value="Object.keys(tabs)[0]">
      <el-tab-pane v-for="(gvalue, gkey) in tabs" :key="gkey" :label="label(gkey)" :name="gkey">
        <el-row :gutter="10">
          <el-col
            v-for="(cvalue, ckey) in gvalue.columns"
            :key="ckey"
            :xs="24/Object.keys(gvalue.columns).length"
            :sm="24/Object.keys(gvalue.columns).length"
            :md="24/Object.keys(gvalue.columns).length"
            :lg="24/Object.keys(gvalue.columns).length"
            :xl="24/Object.keys(gvalue.columns).length"
          >
            <div v-if="pkey == 'undefined'">
              <oa-field
                v-for="(value, key) in pvalue"
                v-if="visible(value)"
                :key="key"
                :prop="key"
                :schema="properties[key]"
                v-model="model[key]"
                :messages="messages"
                @propChange="propChange"
                :connector="connector"
                :resource="resource"
                :parent-model="cascadeModel"
              ></oa-field>
            </div>
            <div v-else>
              <el-card v-for="(pvalue, pkey) in cvalue" :key="pkey" class="oa-fields-card">
                <div slot="header" v-if="pkey != 'undefined'">
                  <span>{{pkey}}</span>
                </div>
                <oa-field
                  v-for="(value, key) in pvalue"
                  :key="key"
                  :prop="key"
                  :schema="properties[key]"
                  v-model="model[key]"
                  :messages="messages"
                  @propChange="propChange"
                  :connector="connector"
                  :resource="resource"
                  :parent-model="cascadeModel"
                ></oa-field>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-row v-else :gutter="10">
      <el-col
        v-for="(cvalue, ckey) in columns"
        :key="ckey"
        :xs="24/Object.keys(columns).length"
        :sm="24/Object.keys(columns).length"
        :md="24/Object.keys(columns).length"
        :lg="24/Object.keys(columns).length"
        :xl="24/Object.keys(columns).length"
      >
        <div v-if="pkey == 'undefined'">
          <oa-field
            v-for="(value, key) in pvalue"
            v-if="visible(value)"
            :key="key"
            :prop="key"
            :schema="properties[key]"
            v-model="model[key]"
            :messages="messages"
            @propChange="propChange"
            :connector="connector"
            :resource="resource"
            :parent-model="cascadeModel"
          ></oa-field>
        </div>
        <div v-else>
          <el-card v-for="(pvalue, pkey) in cvalue" :key="pkey" class="oa-fields-card">
            <div slot="header" v-if="pkey != 'undefined'">
              <span>{{pkey}}</span>
            </div>

            <oa-field
              v-for="(value, key) in pvalue"
              v-if="visible(value)"
              :key="key"
              :prop="key"
              :schema="properties[key]"
              v-model="model[key]"
              :messages="messages"
              @propChange="propChange"
              :connector="connector"
              :resource="resource"
              :parent-model="cascadeModel"
            ></oa-field>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { default as Utils } from "../utils/utils";
export default {
  name: "oa-fields",
  props: {
    model: {
      type: Object,
      default: function() {
        return {};
      }
    },
    schema: {},
    options: {},
    messages: {},
    connector: {},
    resource: String,
    parentModel: {}
  },
  data() {
    return {};
  },
  computed: {
    properties() {
      return this.schema.properties;
    },
    fields() {
      if (this.options) {
        return this.options.fields;
      } else {
        let fields = {};
        for (let key in this.schema.properties) {
          if (
            key !== "id" &&
            !this.schema.properties[key].readonly &&
            (this.connector.canActivate() || key != "isActive")
            /*&&
                                !this.schema.properties[key]["x-rel-app"] &&
                                !this.schema.properties[key]["x-rel-to-many-app"]*/
          ) {
            fields[key] = this.schema.properties[key];
          }
        }
        return fields;
      }
    },
    tabs() {
      let groups = {};
      for (let key in this.fields) {
        let el = this.fields[key];
        const group = el["x-ui-group"];
        if (group in groups == false) {
          groups[group] = {};
        }
        groups[group][key] = el;
      }
      for (let key in groups) {
        let el = groups[key];
        el.columns = this.generateColumns(el);
      }
      return groups;
    },
    columns() {
      return this.generateColumns(this.fields);
    },
    isMobile() {
      return Utils.isMobile(window);
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    },
    cascadeModel() {
      return {
        model: this.model,
        parent: this.parentModel
      };
    }
  },
  methods: {
    label(name) {
      if (this.messages && this.messages[name]) return this.messages[name];
      else return name;
    },
    propChange(key, value) {
      this.$set(this.model, key, value);
    },
    generateColumns(fields) {
      var columns = {};
      for (var key in fields) {
        var el = this.fields[key];
        var column = el["x-ui-column"];
        if (column in columns == false) {
          columns[column] = {};
        }
        columns[column][key] = el;
      }
      var cardCols = {};
      for (var col in columns) {
        cardCols[col] = this.generateCards(columns[col]);
      }
      return cardCols;
    },
    generateCards(fields) {
      var cards = {};
      for (var key in fields) {
        var el = this.fields[key];
        var card = el["x-ui-card"];
        if (card in cards == false) {
          cards[card] = {};
        }
        cards[card][key] = el;
      }
      return cards;
    },
    visible(field) {
      let dependencyField = field["x-ui-dependency-field"];
      let dependencyValue = field["x-ui-dependency-value"];
      if (dependencyField) {
        return this.model[dependencyField] == dependencyValue;
      } else {
        return true;
      }
    }
  }
};
</script>
<style >
.oa-fields-card {
  margin-bottom: 20px;
}

.oa-fields-card .el-card__header {
  padding: 5px 20px;
  background-color: #f5f7fa;
}
</style>