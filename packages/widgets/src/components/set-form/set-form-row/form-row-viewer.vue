<template>
  <div>
    <a-row v-for="row in fieldRows" :key="row.key" :gutter="20">
      <a-col
        v-for="field in row.children"
        :key="field.key || field.model"
        :span="field.span"
        :offset="field.offset || 0"
      >
        <SetFormTypeViewer
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          @onValueChange="handleValueChange"
          @onSwitchChange="handleSwitchChange"
        >
          <template #fieldRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </SetFormTypeViewer>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, toRefs } from 'vue'
import { FormTypeViewer } from '@/components/set-form/set-form-type'

export default defineComponent({
  name: 'SetFormRowViewer',
  components: { SetFormTypeViewer: FormTypeViewer },
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    fieldRows: {
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
    }
  },
  emits: ['onValueChange', 'onSwitchChange'],
  setup(props, { emit }) {
    const handleValueChange = (key, event) => {
      emit('onValueChange', key, event)
    }
    const handleSwitchChange = (key, event) => {
      emit('onSwitchChange', key, event)
      emit('onValueChange', key, event)
    }
    return { handleValueChange, handleSwitchChange }
  }
})
</script>

<style lang="less" scoped></style>
