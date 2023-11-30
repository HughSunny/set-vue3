<template>
  <template v-if="colType === 'custom'">
    <a-row v-for="row in formFieldRows" :key="row.key" :gutter="20">
      <a-col
        v-for="field in row.children"
        :key="field.model"
        :span="field.span || 24"
        :offset="field.offset || 0"
      >
        <FormTypeEdit
          v-model:value="data[field.model]"
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          :error="errors[field.model]"
          @onValueChange="handleValueChange"
        >
          <template #editRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </FormTypeEdit>
      </a-col>
      <a-col v-if="$slots.rightAppend" v-bind="rightAppendCol" align="right">
        <slot name="rightAppend" />
      </a-col>
    </a-row>
  </template>
  <template v-else>
    <a-row :gutter="20">
      <a-col v-for="field in formFields" :key="field.model" v-bind="colBindAttrs">
        <FormTypeEdit
          v-model:value="data[field.model]"
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          :error="errors[field.model]"
          @onValueChange="handleValueChange"
        >
          <template #editRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </FormTypeEdit>
      </a-col>
      <a-col
        v-if="$slots.rightAppend"
        v-bind="rightAppendCol ? rightAppendCol : colBindAttrs"
        align="right"
      >
        <slot name="rightAppend" />
      </a-col>
    </a-row>
  </template>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SetFormRowEdit'
})
import { watch, computed, ref, watchEffect, reactive } from 'vue'
import { FormTypeEdit } from '../../set-form'
import { getRuleFieldRow, getRuleFieldList } from '../../../utils/set-form-helper'
import { SetFieldType, type SetFormRowField } from '../../../entity'
// slot rightAppend: 靠右组件

const props = defineProps({
  fields: {
    type: Array<SetFormRowField>,
    default() {
      return []
    }
  },

  data: {
    // 传进来的应该是reactive的数据对象
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
  errors: {
    type: Object,
    default() {
      return {}
    }
  },
  form: {
    type: Object,
    default() {
      return null
    }
  },
  colType: {
    type: String,
    default() {
      //'custom'| '8-col' | '12-col' | '6-col'
      return 'custom'
    }
  },

  rightAppendCol: {
    type: Object,
    default() {
      return null
    }
  },
  sectionName: {
    type: String,
    default() {
      return null
    }
  }
})
const emit = defineEmits(['onValueChange'])
const formFieldRows = ref(getRuleFieldRow(props.fields, props.sectionName, {}) || [])
const formFields = ref(getRuleFieldList(props.fields, props.sectionName) || [])

const handleValueChange = (key, event) => {
  emit('onValueChange', key, event)
  if (props.form) {
    // 下下策 文件触发校验的时机有问题，所以在设置值之后需要清空校验
    const fieldMatch = props.fields.find((field) => field.model === key)
    if (
      fieldMatch
      // && (fieldMatch.type === SetFieldType.Image ||
      //   fieldMatch.type === SetFieldType.File ||
      //   fieldMatch.type === SetFieldType.MultiFile ||
      //   fieldMatch.type === SetFieldType.MultiImageFile)
    ) {
      props.form.validateFields([key])
      // rowFormRef.value.clearValidate(key)
    }
  }
}
watch(
  () => props.data,
  (newData) => {
    console.log('FORM ROW WATCH ===========', newData)
  }
)
const requireField = (modelKey, required = true) => {}

watchEffect(() => {
  formFieldRows.value = getRuleFieldRow(props.fields, props.sectionName, {}) || []
  formFields.value = getRuleFieldList(props.fields, props.sectionName) || []
})

const colBindAttrs = computed(() => {
  if (props.colType === 'custom') {
    return {}
  }
  if (props.colType === '6-col') {
    return {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 6
    }
  }
  if (props.colType === '12-col') {
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12
    }
  }
  if (props.colType === '8-col') {
    return {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8
    }
  }
  return {}
})
</script>

<style lang="less" scoped></style>
