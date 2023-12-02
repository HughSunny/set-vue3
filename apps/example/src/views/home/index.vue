<template>
  <div style="display: flex; flex-direction: column">
    测试页面HOME
    <a-button>223434324</a-button>
    <custom-btn></custom-btn>
    怎么回事
    <IndustryUpload></IndustryUpload>
    {{ AppConfig }}
    <a-form ref="rowFormRef" layout="vertical" :model="designFormData">
      <set-form-row-edit
        :form="rowFormRef"
        :data="designFormData"
        :fields="dataFields"
        @onValueChange="handleShowValueChange"
      />
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { AppConfig } from '@xdc/core';
import { SetFieldType } from '@xdc/widgets';
import checkData from '@/config/constants/checkbox-data.json';
import cloudDeployment from '@/config/constants/cloud-deployment.json';
import { YES_NO } from '@/config/constants/common';
import industryType from '@/config/constants/industry-type.json';

defineOptions({
  name: 'Home',
});

const dataFields = [
  {
    key: 'input',
    model: SetFieldType.Input, //form的key
    label: '文本',
    type: 'input',
    required: true,
    span: 12,
    params: {
      // 参数，属于设计的参数
      width: '100%',
      type: 'email', // 子属性
      placeholder: '1111',
      disabled: true, // 不可编辑
      hidden: false, //没有实现
      prepend: 'prepend',
      append: {
        label: 'append',
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
];
const rowFormRef = ref();
const designFormData = reactive({});
const formDesignRef = ref();
// const inlineFields = ref([]);
// const formData = reactive({ buttonText: '提交', name: undefined, isInline: false });
const handleShowValueChange = (key, event) => {
  console.log('handleShowValueChange ===============================>', key, event);
  designFormData[key] = event;
};
</script>
