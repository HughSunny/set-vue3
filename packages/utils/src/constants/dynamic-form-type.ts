// key  对应        fieldType
// type 对应表单生成中type

export const FieldTypes = [
  {
    key: 'text',
    label: '文本',
    type: 'input',
  },
  {
    key: 'textArea',
    label: '文本域',
    type: 'inputArea',
  },
  {
    key: 'number',
    label: '数字',
    type: 'number',
    props: {
      min: 0,
    },
    rules: [
      {
        pattern: /^[+]{0,1}(\d+)$/,
        // type: 'number',
        // min: -2,
        message: '最小为0',
        trigger: ['blur', 'change'],
      },
    ],
  },
  {
    key: 'url',
    label: '链接',
    type: 'input',
  },
  {
    key: 'phoneNumber',
    label: '手机号',
    type: 'input',
    rules: [
      {
        pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
        message: '请输入正确的手机号',
        trigger: ['blur', 'change'],
      },
    ],
  },
  {
    key: 'idNumber',
    label: '身份证',
    type: 'input',
    rules: [
      {
        pattern:
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        message: '请输入正确的身份证号码',
        trigger: ['blur', 'change'],
      },
    ],
  },
  {
    key: 'email',
    label: '电子邮箱',
    type: 'input',
    rules: [
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '请输入正确的电子邮箱',
        trigger: ['blur', 'change'],
      },
    ],
  },

  {
    key: 'select',
    label: '选择',
    type: 'select',
  },
  {
    key: 'checkbox',
    label: '复选框',
    type: 'checkbox',
  },
  {
    key: 'radio',
    label: '单选',
    type: 'radio',
  },
  {
    key: 'date',
    label: '日期',
    type: 'date',
  },
  {
    key: 'upload',
    label: '文件上传',
    type: 'file',
  },
  {
    key: 'imageUpload',
    label: '图片上传',
    type: 'imageFile',
  },
  {
    key: 'multiUpload',
    label: '多文件上传',
    type: 'multiFile',
    props: {
      limit: 100,
    },
  },
  {
    key: 'multiImageUpload',
    label: '多图片上传',
    type: 'multiImageFile',
    props: {
      limit: 100,
    },
  },
  // {
  //   key: 'cascader',
  //   label: '级联',
  //   type: 'cascader'
  // }
];
export const FieldTypeMap = {
  text: 'text',
  textArea: 'textArea',
  number: 'number',
  url: 'url',
  phoneNumber: 'phoneNumber',
  email: 'email',
  select: 'select',
  radio: 'radio',
  checkbox: 'checkbox',
  upload: 'upload',
  imageUpload: 'imageUpload',
  multiUpload: 'multiUpload',
  multiImageUpload: 'multiImageUpload',
};

export const getFieldTypeRules = type => {
  return (FieldTypes.find(aa => aa.key === type) || {}).rules;
};
export const getFieldTypeProps = type => {
  return (FieldTypes.find(aa => aa.key === type) || {}).props;
};

export default {
  FieldTypes,
  FieldTypeMap,
  getFieldTypeRules,
  getFieldTypeProps,
};
