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
      :name="dynamicKey || field.key"
      :required="field.required"
      :validateFirst="true"
      :label="showLabel ? field.label : null"
      :labelCol="labelCol"
      :ref="field.key"
      :validateStatus="error ? 'error' : undefined"
      :help="error"
      v-bind="field.formProps"
    >
      <!--      :label-width="showLabel ? field.labelWidth || labelWidth || 'auto' : 'auto'"-->
      <SetTypeFieldEdit
        :field="field"
        :dynamicKey="dynamicKey"
        :fieldValue="fieldValue"
        :data="data"
        :optionDict="optionDict"
        @onValueChange="handleValueChange"
        @onSwitchChange="handleSwitchChange"
      >
        <template #editRender="scope">
          <slot name="editRender" :field="scope.field"></slot>
        </template>
      </SetTypeFieldEdit>
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

<script lang="ts">
import { defineComponent, computed, watch, toRefs, ref, watchEffect } from 'vue'
import { FieldTypeEdit } from '@/components/set-form/set-field-type'
import { InfoCircleFilled } from '@ant-design/icons-vue'
// ANTD label-width 不能设置
export default defineComponent({
  name: 'SetFormTypeEdit',
  components: { SetTypeFieldEdit: FieldTypeEdit, InfoCircleFilled },
  props: {
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
    error: {
      type: String,
      default() {
        return null
      }
    }
  },
  emits: ['onValueChange', 'onSwitchChange'],
  setup(props, { emit }) {
    const fieldValue = ref(props.data[props.dynamicKey || props.field.key])
    // const dynamicValue = computed(() => {
    //   const { data, dynamicKey, field } = props
    //   const value = dynamicKey ? data[dynamicKey] : data[field.key]
    //   const { type } = field
    //   if (type === 'input' || type === 'inputArea' || type === 'switch') {
    //     return value !== null && value !== undefined ? value : ' '
    //   }
    //   return value
    // })
    const handleValueChange = (key, event) => {
      emit('onValueChange', key, event)
    }
    const labelCol = computed(() => {
      const { showLabel, labelWidth, field } = props
      return showLabel
        ? {
            style: `${
              field.labelWidth || labelWidth ? `width: ${field.labelWidth || labelWidth}` : ''
            }`
          }
        : { span: 0 }
    })

    const handleSwitchChange = (key, event) => {
      emit('onSwitchChange', key, event)
      emit('onValueChange', key, event)
    }

    watchEffect(() => {
      console.log('SetFormTypeEdit  ====> watchEffect ')
      fieldValue.value = props.data[props.dynamicKey || props.field.key]
    })

    return { fieldValue, labelCol, handleValueChange, handleSwitchChange }
  }
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
