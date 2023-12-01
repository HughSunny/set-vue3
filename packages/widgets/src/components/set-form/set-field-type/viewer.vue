<template>
  <div class="set-type-field_viewer">
    <span v-if="field.type === SetFieldType.Input" class="contentRow" :style="valueStyle">
      <span v-if="field.params?.prepend">{{ field.params?.prepend }} -</span>
      {{ dynamicValue }}
      <span v-if="field.params?.append" class="row">
        -
        <span v-if="field.params?.append.type === SetFieldType.Select">
          {{ getSingleSelectValueByKey(field.params?.append.model).title }}
        </span>
        <!--        <SetTypeFieldViewer-->
        <!--          v-if="field.params?.append.type === 'select'"-->
        <!--          :field="field.params?.append"-->
        <!--          :data="data"-->
        <!--          :optionDict="optionDict"-->
        <!--          :value-style="valueStyle"-->
        <!--        >-->
        <!--        </SetTypeFieldViewer>-->
        <span v-else>{{ field.params?.append }}</span>
      </span>
    </span>
    <span
      v-else-if="field.type === SetFieldType.InputArea"
      :style="valueStyle"
      v-html="inputAreaValue"
    ></span>
    <span v-else-if="field.type === SetFieldType.InputNumber" :style="valueStyle">{{
      dynamicValue
    }}</span>

    <span v-else-if="field.type === SetFieldType.Select" :style="valueStyle">
      {{ getSingleSelectValue().title }}
    </span>

    <span v-else-if="field.type === SetFieldType.Switch" :style="valueStyle">
      <span>{{
        dynamicValue
          ? $t(field.props?.checkedChildren ? field.props?.checkedChildren : 'system.status.yes')
          : $t(field.props?.unCheckedChildren ? field.props?.unCheckedChildren : 'system.status.no')
      }}</span>
    </span>

    <span v-else-if="field.type === SetFieldType.Radio" :style="valueStyle">
      {{ getSingleSelectValue().title }}
    </span>

    <span v-else-if="field.type === SetFieldType.TimePicker" :style="valueStyle">
      {{ getTimeValue() }}
    </span>
    <span v-else-if="field.type === SetFieldType.DateRange" :style="valueStyle">
      {{ getRangeTimeString(dynamicValue, field.format || 'YYYY-MM-DD') }}
    </span>
    <span v-else-if="field.type === SetFieldType.MultiSelect" :style="valueStyle">
      {{ getMultipleSelectValues().join('，') }}
    </span>
    <div
      v-else-if="field.type === SetFieldType.CheckBox"
      style="display: flex; flex-direction: column"
    >
      <span v-for="item in getMultipleSelectValues()" :style="valueStyle" :key="item">
        {{ item }}
      </span>
    </div>
    <span v-else-if="field.type === SetFieldType.TreeSelect" :style="valueStyle">{{
      getCascaderValue()
    }}</span>
    <span v-else-if="field.type === SetFieldType.Cascader" :style="valueStyle">{{
      getCascaderValue()
    }}</span>
    <IndustryUpload
      v-else-if="field.type === SetFieldType.File || field.type === SetFieldType.Image"
      v-model:fileUrl="dynamicValue"
      :type="field.type === SetFieldType.Image ? 'image' : 'file'"
      :needFileName="(field.options || {}).needFileName === false ? false : true"
      v-bind="field.props"
      :is-edit="false"
    />

    <IndustryUpload
      v-else-if="
        field.type === SetFieldType.MultiFile || field.type === SetFieldType.MultiImageFile
      "
      v-model:dataList="dynamicValue"
      :type="field.type === SetFieldType.MultiImageFile ? 'image' : 'file'"
      v-bind="field.props"
      :is-edit="false"
    />
    <slot v-else name="valueRender" :field="field">
      <span :style="{ color: '#9B9B9B' }">{{ dynamicValue }}</span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SetFieldTypeViewer',
});
import { computed, watch } from 'vue';
import { SetFieldType } from '@/entity/set-form';
import { getItemFromDataSourceById } from '@/utils/helper';
import dayjs from 'dayjs';

const props = defineProps({
  field: {
    type: Object,
    default() {
      return {};
    },
  },
  dynamicKey: {
    type: String,
    default() {
      return null;
    },
  },
  data: {
    type: Object,
    default() {
      return {};
    },
  },
  optionDict: {
    type: Object,
    default() {
      return {};
    },
  },
  valueStyle: {
    type: String,
    default() {
      return '';
    },
  },
  // hideAdd: {
  //   type: Boolean,
  //   default: false
  // },
});

const dynamicValue = computed(() => {
  const { data, dynamicKey, field } = props;
  const value = dynamicKey ? data[dynamicKey] : data[field.model];
  const { type } = field;
  if (
    type === SetFieldType.Input ||
    type === SetFieldType.InputArea ||
    type === SetFieldType.Switch
  ) {
    return value !== null && value !== undefined ? value : ' ';
  }
  return value;
});
const inputAreaValue = computed(() => {
  const { data, dynamicKey, field } = props;
  const value = dynamicKey ? data[dynamicKey] : data[field.model];
  return value !== null && value !== undefined
    ? value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    : '  ';
});

const getSingleSelectValueByKey = key => {
  const { field, data } = props;
  return getOptions(field, key).find(item => item.value === data[key]) || {};
};
const getSingleSelectValue = () => {
  const { field } = props;
  return (
    getOptions(field, field.model).find(item => item.value === dynamicValue.value) || {
      title: dynamicValue.value,
    }
  );
};
const getMultipleSelectValues = () => {
  const { field } = props;
  const values = dynamicValue.value || [];
  return (
    getOptions(field, field.model).filter(item => values.indexOf(item.value) !== -1) || []
  ).map(ss => ss.title);
};

const getTimeValue = () => {
  const value = dynamicValue.value;
  if (!value || !value.trim()) {
    return '';
  }
  let timeFormat = 'YYYY-MM-DD';
  const pickerType = props.field.props?.picker;
  const showTime = props.field.props?.showTime;
  if (showTime) {
    timeFormat = 'YYYY-MM-DD HH:mm:ss';
  }
  if (pickerType === 'month') {
    timeFormat = 'YYYY-MM';
  } else if (pickerType === 'year') {
    timeFormat = 'YYYY';
  }
  return dayjs(value).format(timeFormat);
};
const getTimeString = (value, formatString) => {
  if (!value || !value.trim()) {
    return '';
  }
  return dayjs(value).format(formatString || 'YYYY-MM-DD');
};
const getRangeTimeString = (value, formatString) => {
  if (!value || value.length !== 2) {
    return '';
  }
  return getTimeString(value[0], formatString) + ' - ' + getTimeString(value[1], formatString);
};
const getCascaderValue = () => {
  const { data, dynamicKey, field } = props;
  const key = dynamicKey || field.model;
  const item = getItemFromDataSourceById(
    getOptions(field, field.model),
    data[key] ? data[key][data[key].length - 1] : null,
    'value',
  );
  return (item || {}).label;
};
const getOptions = (field, key) => {
  const { optionDict } = props;
  return field.options || (optionDict ? optionDict[key || field.model] || [] : []);
};
</script>

<style lang="less" scoped>
.set-type-field_viewer {
  color: rgba(0, 0, 0, 0.85);
  .contentRow {
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;

    span {
      flex: 0 0 auto;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span {
    flex: 1;
    white-space: normal;
    word-break: break-all;
    line-height: 32px;
  }
}
</style>
