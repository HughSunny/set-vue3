<template>
  <div class="set-type-field_viewer">
    <span v-if="field.type === 'input'" class="contentRow" :style="valueStyle">
      <span v-if="field.prepend">{{ field.prepend }} -</span>
      {{ dynamicValue }}
      <span v-if="field.append" class="row">
        -
        <span v-if="field.append.type === 'select'">
          {{ getSingleSelectValueByKey(field.append.key).title }}
        </span>
        <!--        <SetTypeFieldViewer-->
        <!--          v-if="field.append.type === 'select'"-->
        <!--          :field="field.append"-->
        <!--          :data="data"-->
        <!--          :optionDict="optionDict"-->
        <!--          :value-style="valueStyle"-->
        <!--        >-->
        <!--        </SetTypeFieldViewer>-->
        <span v-else>{{ field.append }}</span>
      </span>
    </span>
    <span v-else-if="field.type === 'inputArea'" :style="valueStyle" v-html="inputAreaValue"></span>
    <span v-else-if="field.type === 'number'" :style="valueStyle">{{ dynamicValue }}</span>

    <span v-else-if="field.type === 'select'" :style="valueStyle">
      {{ getSingleSelectValue().title }}
    </span>

    <span v-else-if="field.type === 'switch'" :style="valueStyle">
      <span v-if="field.switchType === 'bool'">{{ dynamicValue ? '是' : '否' }}</span>
      <span v-else>{{ dynamicValue }}</span>
    </span>

    <span v-else-if="field.type === 'radio'" :style="valueStyle">
      {{ getSingleSelectValue().title }}
    </span>

    <span v-else-if="field.type === 'date'" :style="valueStyle">
      {{ getTimeString(dynamicValue, 'YYYY-MM-DD') }}
    </span>
    <span v-else-if="field.type === 'time'" :style="valueStyle">
      {{ getTimeString(dynamicValue, field.format || 'YYYY-MM-DD HH:mm:ss') }}
    </span>
    <span v-else-if="field.type === 'daterange'" :style="valueStyle">
      {{ getRangeTimeString(dynamicValue, field.format || 'YYYY-MM-DD') }}
    </span>
    <span v-else-if="field.type === 'multi-select'" :style="valueStyle">
      {{ getMultipleSelectValues().join('，') }}
    </span>
    <div v-else-if="field.type === 'checkbox'" style="display: flex; flex-direction: column">
      <span v-for="item in getMultipleSelectValues()" :style="valueStyle" :key="item">
        {{ item }}
      </span>
    </div>

    <span v-else-if="field.type === 'cascader'" :style="valueStyle">{{ getCascaderValue() }}</span>

    <OssUpload
      v-else-if="field.type === 'file' || field.type === 'imageFile'"
      v-model:fileUrl="dynamicValue"
      :type="field.type === 'imageFile' ? 'image' : 'file'"
      :needFileName="(field.options || {}).needFileName === false ? false : true"
      v-bind="field.props"
      :is-edit="false"
    />

    <OssUpload
      v-else-if="field.type === 'multiFile' || field.type === 'multiImageFile'"
      v-model:dataList="dynamicValue"
      :type="field.type === 'multiImageFile' ? 'image' : 'file'"
      v-bind="field.props"
      :is-edit="false"
    />
    <slot v-else name="valueRender" :field="field">
      <span :style="{ color: '#9B9B9B' }">{{ dynamicValue }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, toRefs } from 'vue';
  import { getItemFromDataSourceById } from '@set/utils';
  // import SetUpload from '@/components/set-upload/index.vue';
  import SetUpload from '../../set-upload/index.vue';
  import dayjs from 'dayjs';
  // import { FieldTypeViewer } from '@/components/set-field-type/index'
  export default defineComponent({
    name: 'SetFieldTypeViewer',
    // SetTypeFieldViewer: FieldTypeViewer
    components: { OssUpload: SetUpload },
    props: {
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
    },
    emits: ['onValueChange'],
    setup(props, { emit }) {
      // const { data, dynamicKey, field } = toRefs(props)
      const dynamicValue = computed(() => {
        const { data, dynamicKey, field } = props;
        const value = dynamicKey ? data[dynamicKey] : data[field.key];
        const { type } = field;
        if (type === 'input' || type === 'inputArea' || type === 'switch') {
          return value !== null && value !== undefined ? value : ' ';
        }
        return value;
      });
      const inputAreaValue = computed(() => {
        const { data, dynamicKey, field } = props;
        const value = dynamicKey ? data[dynamicKey] : data[field.key];
        return value !== null && value !== undefined
          ? value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
          : '  ';
      });

      const getDynamicValue = () => {
        const { data, dynamicKey, field } = props;
        const value = dynamicKey ? data[dynamicKey] : data[field.key];
        const { type } = field;
        if (type === 'input' || type === 'inputArea' || type === 'switch') {
          return value !== null && value !== undefined ? value : ' ';
        }
        return value;
      };
      const getSingleSelectValueByKey = (key) => {
        const { field, data } = props;
        return getOptions(field, key).find((item) => item.value === data[key]) || {};
      };
      const getSingleSelectValue = () => {
        const { field } = props;
        return (
          getOptions(field, field.key).find((item) => item.value === getDynamicValue()) || {
            title: getDynamicValue(),
          }
        );
      };
      const getMultipleSelectValues = () => {
        const { field } = props;
        const values = getDynamicValue() || [];
        return (
          getOptions(field, field.key).filter((item) => values.indexOf(item.value) !== -1) || []
        ).map((ss) => ss.title);
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
        return (
          getTimeString(value[0], formatString) + ' - ' + getTimeString(value[1], formatString)
        );
      };
      const getCascaderValue = () => {
        const { data, dynamicKey, field } = props;
        const key = dynamicKey || field.key;
        const item = getItemFromDataSourceById(
          getOptions(field, field.key),
          data[key] ? data[key][data[key].length - 1] : null,
          'value'
        );
        return (item || {}).label;
      };
      const getOptions = (field, key) => {
        const { optionDict } = props;
        return field.options || (optionDict ? optionDict[key || field.key] || [] : []);
      };
      return {
        dynamicValue,
        inputAreaValue,
        getOptions,
        getDynamicValue,
        getSingleSelectValue,
        getMultipleSelectValues,
        getSingleSelectValueByKey,
        getTimeString,
        getRangeTimeString,
        getCascaderValue,
      };
    },
  });
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
