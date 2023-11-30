<template>
  <template v-if="colType === 'custom'">
    <a-row v-for="row in fieldRows" :key="row.key" :gutter="20">
      <a-col
        v-for="field in row.children"
        :key="field.key || field.model"
        :span="field.span"
        :offset="field.offset || 0"
      >
        <FormTypeViewer
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          @onValueChange="handleValueChange"
        >
          <template #fieldRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </FormTypeViewer>
      </a-col>
      <a-col v-if="$slots.rightAppend" v-bind="colBindAttrs" align="right">
        <slot name="rightAppend" />
      </a-col>
    </a-row>
  </template>
  <template v-else>
    <a-row :gutter="20">
      <a-col v-for="field in fields" :key="field.model" v-bind="colBindAttrs">
        <FormTypeViewer
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          @onValueChange="handleValueChange"
        >
          <template #fieldRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </FormTypeViewer>
      </a-col>
      <a-col v-if="$slots.rightAppend" v-bind="colBindAttrs" align="right">
        <slot name="rightAppend" />
      </a-col>
    </a-row>
  </template>
</template>

<script lang="ts" setup>
defineOptions({
  name:'SetFormRowViewer'
})
import { defineComponent, computed, watchEffect, ref } from 'vue'
import { FormTypeViewer } from '../../set-form'
import { getRuleFieldRow } from '../../../utils/set-form-helper'
const props = defineProps({
  fields: {
    type: Array,
    default() {
      return []
    }
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
  errors: {
    type: Object,
    default() {
      return {}
    }
  },
  colType: {
    type: String,
    default() {
      //'custom'| '8-col' | '12-col' | '6-col'
      return 'custom'
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
const fieldRows = ref(getRuleFieldRow(props.fields, props.sectionName, {}) || [])

watchEffect(() => {
  fieldRows.value = getRuleFieldRow(props.fields, props.sectionName, {}) || []
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
const handleValueChange = (key, event) => {
  emit('onValueChange', key, event)
}
watchEffect(() => {
  fieldRows.value = getRuleFieldRow(props.fields, props.sectionName, {}) || []
})
</script>

<style lang="less" scoped></style>
