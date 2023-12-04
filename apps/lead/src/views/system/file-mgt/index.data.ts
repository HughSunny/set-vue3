import { useI18n } from '@xdc/core';
import { SetFieldType, type SetFormRowField } from '@xdc/widgets';

const { t } = useI18n();
export const entityName = '文件';
export const searchSchemas: SetFormRowField[] = [
  {
    label: '文件名',
    model: 'fileName',
    type: SetFieldType.Input,
    span: 8,
    params: {
      maxLength: 100,
    },
  },
];

export const defaultValue = {
  fileName: '',
  linkId: '',
  remark: '',
};
export const entitySchemas: SetFormRowField[] = [
  {
    label: '文件名',
    model: 'fileName',
    type: SetFieldType.Input,
    required: true,
    params: {
      maxLength: 20,
    },
  },
  {
    label: '关联ID',
    model: 'linkId',
    type: SetFieldType.Input,
    required: true,
    params: {},
  },
  {
    label: '备注',
    model: 'remark',
    type: SetFieldType.Input,
    params: {
      maxLength: 100,
    },
  },
];

export const tableColumns = [
  {
    title: '文件hash值',
    dataIndex: 'fileHash',
    key: 'fileHash',
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  {
    title: '文件夹名',
    dataIndex: 'bucketName',
    key: 'bucketName',
  },
  // {
  //   title: '关联ID',
  //   dataIndex: 'linkId',
  //   key: 'linkId'
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  //   key: 'remark'
  // },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
  },
  // {
  //   title: '上传人',
  //   dataIndex: 'createdUser',
  //   key: 'createdUser'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];
