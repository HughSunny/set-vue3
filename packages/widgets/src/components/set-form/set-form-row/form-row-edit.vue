<template>
  <div>
    <a-row v-for="row in fieldRows" :key="row.key" :gutter="20">
      <a-col
        v-for="field in row.children"
        :key="field.key"
        :span="field.span || 24"
        :offset="field.offset || 0"
      >
        <SetFormTypeEdit
          :field="field"
          :label-width="labelWidth"
          :data="data"
          :optionDict="optionDict"
          :error="errors[field.key]"
          @onValueChange="handleValueChange"
          @onSwitchChange="handleSwitchChange"
        >
          <template #editRender="scope">
            <slot name="itemRender" :field="scope.field"></slot>
          </template>
        </SetFormTypeEdit>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, toRefs } from 'vue'
import { FormTypeEdit } from '@/components/set-form/set-form-type'
/*
   field :{
       type,
       disabled,
       placeholder,
       key,
       label,
       labelWidth

       append:{
         另外一个 field
       }
       itemSpan:

       props: {
         // 参照elementui  各种组件  添加附加属性
         style
       }
       formProps: {
         // formItem 的属性
       }
       switchType: 可以废弃  放到props
   }
 */
export default defineComponent({
  name: 'SetFormRowEdit',
  components: { SetFormTypeEdit: FormTypeEdit },
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
    },
    form: {
      type: Object,
      default() {
        return null
      }
    },
  },
  emits: ['onValueChange', 'onSwitchChange'],
  setup(props, { emit }) {
    const handleValueChange = (key, event) => {
      emit('onValueChange', key, event)
      if (props.form) {
        // 下下策 文件触发校验的时机有问题，所以在设置值之后需要清空校验
        const fieldMatch = props.fields.find((field) => field.key === key);
        if (fieldMatch && (fieldMatch.type.indexOf('ile' ) !== -1 ) ) {
          props.form.validateFields([key])
          // rowFormRef.value.clearValidate(key)
        }
      }
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
