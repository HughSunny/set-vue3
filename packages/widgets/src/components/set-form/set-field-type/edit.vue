<template>
  <div class="set-type-field_edit">
    <a-input
      v-if="field.type === SetFieldType.Input"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      :placeholder="$t('sys.action.pleaseInput') + $t(field.label)"
      allowClear
      v-bind="field.props"
    >
      <template v-if="field.params?.prepend" #addonBefore>
        {{ field.params?.prepend }}
      </template>
      <template v-if="field.params?.append" #addonAfter>
        <a-select
          v-if="field.params?.append.type === SetFieldType.Select"
          v-model:value="data[field.params?.append?.model]"
          :placeholder="$t(`sys.action.pleaseInput`) + $t(field.params?.append?.label)"
          :style="{ width: field.params?.append.params?.width || '100px' }"
          :disabled="field.disabled"
          @change="handleSelectChange($event, field.params?.append.model)"
        >
          <a-select-option
            v-for="option in getOptions(field.params?.append, field.params?.append.model)"
            :key="option.value"
            :value="option.value"
          >
            {{ $t(option.title) || option.title }}
          </a-select-option>
        </a-select>
      </template>
    </a-input>

    <a-textarea
      v-else-if="field.type === SetFieldType.InputArea"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      :placeholder="$t('sys.action.pleaseInput') + $t(field.label)"
      v-bind="field.props"
    ></a-textarea>
    <a-input-number
      v-else-if="field.type === SetFieldType.InputNumber"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
    ></a-input-number>
    <a-radio-group
      v-else-if="field.type === SetFieldType.Radio"
      v-model:value="fieldValue"
      style="width: 100%"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
    >
      <template v-if="!field.colCount">
        <a-radio
          class="wrapCheck"
          :class="field.params?.itemCls || ''"
          v-for="item in getOptions(field, field.model)"
          :key="item.value"
          :value="item.value"
        >
          {{ $t(item.title) || item.title }}
        </a-radio>
      </template>

      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.model)" :key="item.value">
          <a-radio class="flexCheck" :value="item.value" :class="field.params?.itemCls || ''">
            {{ $t(item.title) || item.title }}
          </a-radio>
        </a-col>
      </a-row>
    </a-radio-group>
    <a-checkbox-group
      v-else-if="field.type === SetFieldType.CheckBox"
      v-model:value="fieldValue"
      style="width: 100%"
      @change="handleValueChange($event, field.model)"
    >
      <template v-if="!field.colCount">
        <a-row>
          <a-col :span="24" v-for="item in getOptions(field, field.model)" :key="item?.value">
            <a-checkbox :key="item.value" :value="item.value" :class="field.params?.itemCls || ''">
              {{ $t(item.title) || item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </template>
      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.model)" :key="option.value">
          <a-checkbox :value="item.value" :class="field.params?.itemCls || ''">
            {{ $t(item.title) || item.title }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
    <a-select
      v-else-if="field.type === SetFieldType.Select || field.type === SetFieldType.MultiSelect"
      v-model:value="fieldValue"
      :placeholder="$t('sys.action.pleaseSelect') + $t(field.label)"
      :mode="field.type === SetFieldType.MultiSelect ? 'multiple' : null"
      :style="getFieldStyle"
      allowClear
      @change="handleSelectChange($event, field.model)"
      v-bind="field.props"
    >
      <a-select-option
        v-for="option in getOptions(field, field.model)"
        :key="option.value"
        :value="option.value"
        :class="field.params?.itemCls || ''"
      >
        {{ $t(option.title) || option.title }}
      </a-select-option>
    </a-select>
    <a-date-picker
      v-else-if="field.type === SetFieldType.TimePicker"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
    ></a-date-picker>
    <!-- DateRange   picker="week" 切换  // week month year -->
    <a-range-picker
      v-else-if="field.type === SetFieldType.DateRange"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
    >
      <!-- RangeRange   picker="week" 切换  // week month year -->
    </a-range-picker>
    <a-switch
      v-else-if="field.type === SetFieldType.Switch"
      v-model:checked="fieldValue"
      @change="handleSwitchChange($event, field.model)"
    >
      <template v-if="field.props?.checkedChildren" #checkedChildren>{{
        $t(field.props?.checkedChildren)
      }}</template>
      <template v-if="field.props?.unCheckedChildren" #unCheckedChildren>{{
        $t(field.props?.unCheckedChildren)
      }}</template>
    </a-switch>
    <!-- v-bind="field.props" -->
    <!-- :style="getFieldStyle" -->

    <a-cascader
      v-else-if="field.type === SetFieldType.Cascader"
      v-model:value="fieldValue"
      :options="getOptions(field, field.model)"
      expandTrigger="hover"
      :style="getFieldStyle"
      allowClear
      v-bind="field.props"
      @change="handleSelectChange($event, field.model)"
    ></a-cascader>

    <a-tree-select
      v-else-if="field.type === SetFieldType.TreeSelect"
      v-model:value="fieldValue"
      :placeholder="$t('sys.action.pleaseSelect') + $t(field.label)"
      :tree-data="getOptions(field, field.model)"
      expandTrigger="hover"
      @change="handleSelectChange($event, field.model)"
      :style="getFieldStyle"
      allowClear
      v-bind="field.props"
    ></a-tree-select>

    <icon-picker
      v-else-if="field.type === SetFieldType.IconPicker"
      v-model:icon="fieldValue"
      @change="handleSelectChange($event, field.model)"
    >
    </icon-picker>

    <industry-upload
      v-else-if="field.type === SetFieldType.File || field.type === SetFieldType.Image"
      v-model:fileUrl="fieldValue"
      :type="field.type === SetFieldType.Image ? 'image' : 'file'"
      v-bind="field.props"
      @change="handleUploadChange"
    />

    <industry-upload
      v-else-if="field.type === SetFieldType.MultiFile || field.type === SetFieldType.MultiImageFile"
      v-model:data-list="fieldValue"
      :type="field.type === SetFieldType.MultiImageFile ? 'image' : 'file'"
      v-bind="field.props"
      @change="handleMultiUploadChange"
    />
    <slot v-else name="editRender" :field="field">
      <a-input
        v-model:value="fieldValue"
        :placeholder="$t('sys.action.pleaseInput')"
        @change="otherValueChange($event)"
      ></a-input>
    </slot>
  </div>
</template>

<script lang="ts" setup name="SetFieldTypeEdit">
defineOptions({
  name: 'SetFieldTypeEdit'
})
import { computed, ref, watchEffect } from 'vue'
import { IndustryUpload, IconPicker } from '@/components';
import { SetFieldType } from '@/entity/set-form'
const props = defineProps({
  field: {
    type: Object,
    default() {
      return {}
    }
  },
  value: {},
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
  }
  // hideAdd: {
  //   type: Boolean,
  //   default: false
  // },
})
const emit = defineEmits(['onValueChange', 'update:value'])
const fieldValue = ref(props.value)
const colStyle = computed(() => {
  const { field } = props
  return {
    flex: `0 0 ${100 / field.colCount}%`,
    // width: `${100 / this.field.colCount}%`,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  }
})
const getFieldStyle = computed(() => {
  const { field } = props
  let width = '100%'
  const fieldWidth = field.params?.width
  if (fieldWidth) {
    // console.log('----------------------------->fieldWidth', fieldWidth)
    width = fieldWidth
    if (!isNaN(parseFloat(fieldWidth)) && isFinite(fieldWidth)) {
      // console.log('----------------------------->parseFloat', fieldWidth)
      width = `${fieldWidth}px`
    }
  }
  return { width }
})
const getOptions = (field, model) => {
  const { optionDict } = props
  return field.options || (optionDict ? optionDict[model || field.model] || [] : [])
}
const otherValueChange = (event) => {
  const { field } = props
  emit('update:value', event.target.value)
  emit('onValueChange', field.model, event.target.value)
}
const handleValueChange = (event, model) => {
  const { field } = props
  let value = event
  if (field.type === SetFieldType.Input || field.type === SetFieldType.InputArea) {
    value = event.target.value
  } else if (field.type === SetFieldType.Radio) {
    value = event.target.value
  }
  emit('update:value', value)
  emit('onValueChange', model, value)
}
const handleSelectChange = (event, model) => {
  emit('update:value', event)
  emit('onValueChange', model, event)
}

const handleSwitchChange = (event, key) => {
  emit('update:value', event)
  emit('onValueChange', key, event)
}
const handleUploadChange = (file, fileList, type) => {
  const { field } = props
  if (type === 'delete') {
    emit('update:value', '')
    emit('onValueChange', field.model, '')
  } else if (type === 'doing') {
    // 上传中，因为请求是异步的
    emit('update:value', file.url)
    emit('onValueChange', field.model, file.url)
  } else {
    // 添加
    console.log('handleUploadChange  ====> ', file.url)
    emit('update:value', file.url)
    emit('onValueChange', field.model, file.url)
  }
  // formRef.value.clearValidate(field.model)
}
const handleMultiUploadChange = (file, fileList, type) => {
  const { field } = props
  // 多文件上传 fileList 有值
  const fileUrlList = fileList.map((xx) => xx.url)
  if (type === 'delete') {
  } else if (type === 'doing') {
    // 上传中，因为请求是异步的
  } else {
    // 添加
  }
  console.log('handleMultiUploadChange  ====> ', fileUrlList)
  emit('update:value', fileUrlList)
  emit('onValueChange', field.model, fileUrlList)
}
watchEffect(() => {
  if (props.field.type === SetFieldType.TreeSelect) {
    // console.log('SetFieldTypeEdit === >watchEffect ====> ', props.data, props.field, props.value)
  }
  fieldValue.value = props.value
})
</script>

<style lang="less" scoped>
.set-type-field_edit {
  color: #9b9b9b;

  .flexCheckRow {
    //display: flex;
    padding: 6px 0 0;
    flex-wrap: wrap;
  }

  .flexCheck {
    display: flex;
    min-height: 32px;
    flex-direction: row;
    /*align-items: center;*/
    white-space: normal;
  }

  .ant-radio-wrapper-checked {
    color: #1890ff;
  }

  .wrapCheck {
    display: flex;
    //margin-top: 6px;
    margin-bottom: 6px;
    //line-height: 30px;
    //align-items: flex-start;
    .ant-radio {
    }

    //  white-space: normal;
  }
}
</style>
