<template>
  <div class="set-form-type_edit">
    <div v-if="field.type === 'label'" class="el-form-item__label">
      <label v-bind:style="{ display: 'inline-block' }">
        {{ field.label || ' ' }}
      </label>
    </div>
    <a-form-item
      v-else
      :rules="field.rules"
      :name="dynamicKey || field.model"
      :required="field.required"
      :validateFirst="true"
      :label="showLabel ? $t(field.label) : null"
      :labelCol="labelCol"
      :ref="field.model"
      :validateStatus="error ? 'error' : undefined"
      :help="error"
      v-bind="field.formProps"
    >
    <!--  -->
      <!--      :label-width="showLabel ? field.labelWidth || labelWidth || 'auto' : 'auto'"-->
      <FieldTypeEdit
        v-model:value="fieldValue"
        :field="field"
        :data="data"
        :optionDict="optionDict"
        @onValueChange="handleValueChange"
      >
        <template #editRender="scope">
          <slot name="editRender" :field="scope.field"></slot>
        </template>
      </FieldTypeEdit>
      <template v-if="field.labelRemark" #label>
        <span>
          {{ field.label }}
          <a-tooltip class="item" effect="dark" :content="field.labelRemark" placement="top">
            <InfoCircleFilled />
          </a-tooltip>
        </span>
      </template>
    </a-form-item>
  </div>
</template>

<script lang="ts" setup name="SetFormTypeEdit">
defineOptions({
  name:'SetFormTypeEdit'
})
import { defineComponent, computed, watch, toRefs, ref, watchEffect } from 'vue'
import { FieldTypeEdit } from '../../../components/set-form'
import { InfoCircleFilled } from '@ant-design/icons-vue'
// ANTD label-width 不能设置
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
  data: { // 辅助
    type: Object,
    default() {
      return {}
    }
  },
  value: {

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
  error: {
    type: String,
    default() {
      return null
    }
  }
})
const emit = defineEmits(['onValueChange', 'update:value'])
const labelCol = computed(() => {
  const { showLabel, labelWidth, field } = props
  const hasLabelWidth  = field.labelWidth || labelWidth
  if (!showLabel) {
    return { span: 0 }
  }
  return hasLabelWidth
    ? {
        style: `width: ${field.labelWidth || labelWidth}`
      }
    : undefined
})
const fieldValue = ref(props.value)

const handleValueChange = (key, event) => {
  emit('update:value', event)
  emit('onValueChange', key, event)

}

watchEffect(() => {
  // console.log('SetFormTypeEdit  ====> watchEffect data --- KEY- ',props.field.model,  props.data)
  fieldValue.value = props.value
})
</script>

<style lang="less" scoped>
.set-form-type_edit {
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
