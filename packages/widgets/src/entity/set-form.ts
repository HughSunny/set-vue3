
export type FormRowColType = 'custom' | '8-col' | '12-col' | '6-col'
// 输入类型
export enum SetFieldType {
  Select = 'select',
  TimePicker = 'time',
  Radio = 'radio',
  Input = 'input',
  InputNumber = 'number',
  InputArea = 'inputArea',

  IconPicker = 'iconPicker',
  // TimeRange = 'timeRange',
  Switch = 'switch',
  File = 'file',
  Image = 'image',
  // 多选
  MultiFile = 'multiFile',
  MultiImageFile = 'multiImageFile',
  MultiSelect = 'multi-select',
  Cascader = 'cascader',
  TreeSelect = 'tree',
  CheckBox = 'checkbox',
  DateRange = 'dateRange',
  // 列表中操作列
  Action = 'action',
}

/**
 * table-form 的field
 */
export interface SetFormTableField extends SetFormField {
  label: string
  width: number
  minWidth?: number
  tableProps?: any //table-column 的属性值
  tableActions?: TableAction[]
}

export interface TableAction {
  name:string //操作名
  payload: string // 操作回调关键字
}


/**
 * row-form 的field
 */
export interface SetFormRowField extends SetFormField {
  invisible?: boolean //是否可见
  offset?: number //偏离值 offset/24
  span?: number //宽度占 span/24
}

/**
 * form 的field
 */
export interface SetFormField extends SetField {
  label?: string
  required?: boolean
  params?: SetFormFieldParams
  rules?: any[]
  formProps?: any // form-item 其他属性
  section?: string //模块
}
/**
 * formfield 的参数
 */
export interface SetFormFieldParams extends SetFieldParams {
  type?: string
  disabled?: boolean // 不编辑
  labelWidth?: string | number
  maxLength?: number
  width?: string | number // 表单组件的宽度
}

/**
 * field 的参数
 */
export interface SetFieldParams {
  placeholder?: string
  append?: SetFormField //后缀
  prepend?: string //前缀
  itemCls?: string //item的样式
}
/**
 * field的参数
 */
export interface SetField {
  model: string
  type: SetFieldType
  key?: string
  props?: any // 组件其他属性
  options?: any[] // 静态字典 title / value
  params?: SetFieldParams
}


export interface SetFieldGenerateRow {
  key: string;
  children: SetFormField[];
}
