<template>
  <div>
    测试页面HOME
    <a-form layout="vertical" ref="rowFormRef" :model="designFormData">
      <SetFormRowEdit
        :form="rowFormRef"
        :data="designFormData"
        :fields="dataFields"
        :fieldRows="fieldRows"
        @onValueChange="handleShowValueChange"
      />
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import cloudDeployment from './checkbox-data.json';
import checkData from './checkbox-data.json';
import industryType from './checkbox-data.json';
import { YES_NO } from './common';
import { getRuleFieldRow } from '@xdc/widgets';
const dataFields = [
  {
    key: 'input',
    model: 'input', //form的key
    label: '文本',
    type: 'input',
    required: true,
    span: 12,
    params: {
      // 参数，属于设计的参数
      width: '50%',
      type: 'email', // 子属性
      placeholder: '1111',
      disabled: true, // 不可编辑
      hidden: false, //没有实现

      prepend: 'prepend',
      append: {
        model: 'appendSelect',
        type: 'select',
        params: { width: '100px' },
        options: cloudDeployment,
      },
    },
    props: {
      // 参数，属于组件的参数, 样式穿透太烦了，直接传参就好了...
    },
    options: [], // 字典
  },

  {
    key: 'inputArea',
    model: 'inputArea',
    label: '文本域',
    type: 'inputArea',
    required: true,
    params: { width: 200 },
    span: 12,
  },
  {
    key: 'number',
    model: 'number',
    label: '数字',
    type: 'number',
    required: true,
    span: 12,
  },
  {
    key: 'numberInput',
    model: 'numberInput',
    label: '数字1(未实现)',
    type: 'numberInput',
    required: true,
    span: 12,
  },
  {
    key: 'cloudDeployModel',
    model: 'cloudDeployModel',
    label: '选择框',
    type: 'select',
    required: true,
    span: 12,
    options: cloudDeployment,
    params: { width: 200 },
    props: {
      ['filterable']: true,
      ['allow-create']: true,
      ['default-first-option']: true,
    },
  },
  {
    key: 'multi-select',
    model: 'multi-select',
    label: '多选框',
    type: 'multi-select',
    required: true,
    params: { width: 200 },
    span: 12,
    options: cloudDeployment,
  },

  {
    key: 'attachmentInvoiceCopy',
    model: 'attachmentInvoiceCopy',
    label: '发票复印件',
    type: 'file',
    // type: 'imageFile',
    required: true,
    params: { width: 200 },
    span: 12,
    props: {
      limit: 2,
      limitSize: 2,
      needFileName: false,
    },
  },
  {
    key: 'imageFile',
    model: 'imageFile',
    label: '图片文件',
    type: 'imageFile',
    required: true,
    span: 12,
    props: {
      limit: 2,
      limitSize: 2,
      needFileName: false,
    },
    params: { width: 200 },
  },
  {
    key: 'radio',
    model: 'radio',
    label: 'radio',
    type: 'radio',
    required: true,
    span: 12,
    options: YES_NO,
  },
  {
    key: 'switch',
    model: 'switch',
    label: 'switch(未实现)',
    type: 'switch',
    required: true,
    span: 12,
    props: {
      ['active-value']: '是',
      ['inactive-value']: '否',
    },
  },
  {
    key: 'date',
    model: 'date',
    label: 'date',
    type: 'date',
    required: true,
    span: 12,
  },
  {
    key: 'daterange',
    model: 'daterange',
    label: 'daterange',
    type: 'daterange',
    required: true,
    span: 12,
  },
  {
    key: 'cascader',
    model: 'cascader',
    label: 'cascader',
    type: 'cascader',
    required: true,
    span: 12,
    options: industryType,
  },
  {
    key: 'checkboxGroup',
    model: 'checkboxGroup',
    label: 'checkboxGroup',
    type: 'checkbox',
    required: true,
    span: 22,
    options: checkData,
    props: {
      // style:{ display:'flex', width:'100%', flexDirection:'column'},
      max: 2,
    },
  },
  {
    key: 'AUTO',
    model: 'AUTO',
    label: 'AUTO',
    type: 'input1232',
    required: true,
    width: 200,
    span: 12,
  },
];

const fieldRows = ref(getRuleFieldRow(dataFields, null));
const rowFormRef = ref();
const designFormData = reactive({});
const formDesignRef = ref();
// const inlineFields = ref([]);
// const formData = reactive({ buttonText: '提交', name: undefined, isInline: false });
const handleShowValueChange = (key, event) => {
  console.log('handleShowValueChange ===============================>', key, event);
  designFormData[key] = event;
  // // 下下策 文件触发校验的时机有问题，所以在设置值之后需要清空校验
  // const fieldMatch = (formData.isInline ? inlineFields.value : columnFields.value).find((field) => field.model === key);
  // if (fieldMatch && (fieldMatch.type.indexOf('ile' ) !== -1 ) ) {
  //   rowFormRef.value.validateFields([key])
  //   // rowFormRef.value.clearValidate(key)
  // }
};
</script>
