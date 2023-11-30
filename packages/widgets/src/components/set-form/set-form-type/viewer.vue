<template>
  <div class="set-form-type_viewer">
    <div v-if="field.type === 'label'" class="el-form-item__label">
      <label v-bind:style="{ display: 'inline-block' }">
        {{ field.label || ' ' }}
      </label>
    </div>
    <a-form-item
      v-else
      :name="dynamicKey || field.model"
      :required="false"
      :validateFirst="true"
      :label="showLabel ? field.label : null"
      :labelCol="labelCol"
      :ref="field.model"
    >
      <!--      :label-width="showLabel ? field.labelWidth || labelWidth || 'auto' : 'auto'"-->
      <FieldTypeViewer
        :field="field"
        :dynamicKey="dynamicKey"
        :data="data"
        :optionDict="optionDict"
        :value-style="valueStyle"
      >
        <template #valueRender="scope">
          <slot name="fieldRender" :field="scope.field"></slot>
        </template>
      </FieldTypeViewer>
      <!--      <template v-if="field.labelRemark" #label>-->
      <!--        <span>-->
      <!--          {{ field.label }}-->
      <!--          <a-tooltip class="item" effect="dark" :content="field.labelRemark" placement="top">-->
      <!--            <InfoCircleFilled />-->
      <!--          </a-tooltip>-->
      <!--        </span>-->
      <!--      </template>-->
    </a-form-item>
  </div>
</template>

<script lang="ts" setup name="SetFormTypeViewer">
defineOptions({
  name:'SetFormTypeViewer'
})
import { defineComponent, computed, watch, toRefs } from 'vue'
import { FieldTypeViewer } from '../../../components/set-form'
import { InfoCircleFilled } from '@ant-design/icons-vue'
const props = defineProps({
  field: {
    type: Object,
    default() {
      return {}
    }
  },
  dynamicKey: {
    type: String,
    default() {
      return null
    }
  },
  value:{

  },
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  optionDict: {
    type: Object,
    default() {
      return {}
    }
  },
  labelWidth: {
    type: String,
    default() {
      return null
    }
  },
  showLabel: {
    type: Boolean,
    default() {
      return true
    }
  },
  valueStyle: {
    type: String,
    default() {
      return ''
    }
  }
})
// ANTD label-width 不能设置
const labelCol = computed(() => {
  const { showLabel, labelWidth, field } = props
  return showLabel
    ? {
        style: `${field.labelWidth || labelWidth ? `width: ${field.labelWidth || labelWidth}` : ''}`
      }
    : { span: 0 }
})
</script>

<style lang="less" scoped>
.set-form-type_viewer {
  .ant-form-item__label {
    /*color:#000*/
    font-weight: 700;
    line-height: 1.5;
  }

  .ant-form-item__content {
    color: #000;
    font-weight: 400;
    line-height: 1.5;
  }
}
</style>
