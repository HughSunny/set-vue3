<template>
  <div class="set-type-field_edit">
    <a-input
      v-if="field.type === 'input'"
      :disabled="field.disabled"
      v-model:value="fieldValue"
      @change="handleValueChange($event, field.key)"
      :placeholder="field.placeholder || '请输入'"
    >
      <template v-if="field.prepend" #addonBefore>
        {{ field.prepend }}
      </template>
      <template v-if="field.append" #addonAfter>
        <a-select
          v-if="field.append.type === 'select'"
          placeholder="请选择"
          :style="{ width: field.append.width || '100px' }"
          v-model:value="data[field.append.key]"
          :disabled="field.disabled"
          @change="handleSelectChange($event, field.append.key)"
        >
          <a-select-option
            v-for="option in getOptions(field.append, field.append.key)"
            :key="option.value"
            :value="option.value"
          >
            {{ option.title }}
          </a-select-option>
        </a-select>
      </template>
    </a-input>

    <a-textarea
      v-else-if="field.type === 'inputArea'"
      :disabled="field.disabled"
      v-model:value="fieldValue"
      :style="{ width: field.width || '100%' }"
      @change="handleValueChange($event, field.key)"
      v-bind="field.props"
      :placeholder="field.placeholder || ''"
    ></a-textarea>
    <a-input
      v-else-if="field.type === 'number'"
      type="number"
      :disabled="field.disabled"
      v-model.number="fieldValue"
      :style="{ width: field.width || '100%' }"
      @change="handleValueChange($event, field.key)"
      v-bind="field.props"
      :placeholder="field.placeholder || ''"
    ></a-input>
    <a-radio-group
      v-else-if="field.type === 'radio'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      style="width: 100%"
      @change="handleValueChange($event, field.key)"
      v-bind="field.props"
    >
      <template v-if="!field.colCount">
        <a-radio
          class="wrapCheck"
          v-for="item in getOptions(field, field.key)"
          :key="item.value"
          :value="item.value"
        >
          {{ item.title }}
        </a-radio>
      </template>

      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.key)" :key="item.value">
          <a-radio class="flexCheck" :value="item.value">
            {{ item.title }}
          </a-radio>
        </a-col>
      </a-row>
    </a-radio-group>
    <a-checkbox-group
      v-else-if="field.type === 'checkbox'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      style="width: 100%"
      @change="handleValueChange($event, field.key)"
    >
      <template v-if="!field.colCount">
        <a-row>
          <a-col :span="24" v-for="item in getOptions(field, field.key)">
            <a-checkbox :key="item.value" :value="item.value">
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </template>
      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.key)" :key="option.value">
          <a-checkbox :value="item.value">
            {{ item.title }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
    <a-select
      v-else-if="field.type === 'select' || field.type === 'multi-select'"
      placeholder="请选择"
      :style="{ width: field.width || '100%' }"
      v-model:value="fieldValue"
      :mode="field.type === 'multi-select' ? 'multiple' : null"
      :disabled="field.disabled"
      @change="handleSelectChange($event, field.key)"
      v-bind="field.props"
    >
      <a-select-option
        v-for="option in getOptions(field, field.key)"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </a-select-option>
    </a-select>
    <a-date-picker
      v-else-if="field.type === 'date'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      :style="{ width: field.width || '100%' }"
      placeholder="选择日期"
      mode="date"
      value-format="YYYY-MM-DD"
      @change="handleValueChange($event, field.key)"
    ></a-date-picker>

    <a-date-picker
      v-else-if="field.type === 'year'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      :style="{ width: field.width || '100%' }"
      mode="year"
      format="YYYY 年"
      valueFormat="YYYY"
      placeholder="请选择年"
      picker="year"
      @change="handleValueChange($event, field.key)"
    ></a-date-picker>
    <a-range-picker
      v-else-if="field.type === 'daterange' || field.type === 'monthrange'"
      v-model:value="fieldValue"
      :style="{ width: field.width || '100%' }"
      :disabled="field.disabled"
      :placeholder="[
        `开始${field.type === 'daterange' ? '日期' : '月份'}`,
        `结束${field.type === 'daterange' ? '日期' : '月份'}`,
      ]"
      :format="field.type === 'daterange' ? 'YYYY-MM-DD' : 'YYYY-MM'"
      :value-format="field.type === 'daterange' ? 'YYYY-MM-DD' : 'YYYY-MM'"
      @change="handleValueChange($event, field.key)"
      v-bind="field.props"
    >
      <!--      :picker="field.type === 'daterange' ? 'date' : 'month'"-->
    </a-range-picker>
    <oss-upload
      v-else-if="field.type === 'file' || field.type === 'imageFile'"
      v-model:fileUrl="fieldValue"
      :type="field.type === 'imageFile' ? 'image' : 'file'"
      v-bind="field.props"
      :btnTxt="field.btnTxt"
      @onChange="handleUploadChange"
    />

    <oss-upload
      v-else-if="field.type === 'multiFile' || field.type === 'multiImageFile'"
      v-model:data-list="fieldValue"
      :type="field.type === 'multiImageFile' ? 'image' : 'file'"
      v-bind="field.props"
      :btnTxt="field.btnTxt"
      @onChange="handleMultiUploadChange"
    />
    <a-cascader
      v-else-if="field.type === 'cascader'"
      v-model="fieldValue"
      :options="field.options"
      expandTrigger="hover"
      @change="handleSelectChange($event, field.key)"
      style="width: 100%"
    ></a-cascader>
    <slot v-else name="editRender" :field="field">
      <a-input
        :placeholder="field.placeholder || '请输入'"
        :disabled="field.disabled"
        v-model:value="fieldValue"
        @change="handleValueChange($event, field.key)"
      ></a-input>
    </slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    computed,
    watch,
    toRefs,
    ref,
    watchEffect,
    getCurrentInstance,
  } from 'vue';
  import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import SetUpload from '../../set-upload/index.vue';
  export default defineComponent({
    name: 'SetFieldTypeEdit',
    components: { DeleteOutlined, PlusOutlined, FormOutlined, OssUpload: SetUpload },
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
      // hideAdd: {
      //   type: Boolean,
      //   default: false
      // },
    },
    emits: ['onValueChange'],
    setup(props, { emit }) {
      // const app = getCurrentInstance()
      const getFieldValue = () => {
        // value !== null && value !== undefined ? value : ' '
        return props.data[props.dynamicKey || props.field.key];
      };
      const fieldValue = ref(getFieldValue());
      const vValue = props.data[props.dynamicKey || props.field.key];
      const dynamicValue = ref(vValue !== null && vValue !== undefined ? vValue : ' ');
      const colStyle = computed(() => {
        const { field } = props;
        return {
          flex: `0 0 ${100 / field.colCount}%`,
          // width: `${100 / this.field.colCount}%`,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        };
      });

      const getOptions = (field, key) => {
        const { optionDict } = props;
        return field.options || (optionDict ? optionDict[key || field.key] || [] : []);
      };
      const handleValueChange = (event, key) => {
        const { field } = props;
        let value = event;
        if (field.type === 'input' || field.type === 'inputArea' || field.type === 'number') {
          value = event.target.value;
        } else if (field.type === 'radio') {
          value = event.target.value;
        }

        emit('onValueChange', key, value);
      };
      const handleSelectChange = (event, key) => {
        emit('onValueChange', key, event);
      };

      const handleUploadChange = (file, fileList, type) => {
        const { field } = props;
        if (type === 'delete') {
          emit('onValueChange', field.key, '');
        } else if (type === 'doing') {
          // 上传中，因为请求是异步的，所以需要占位
          emit('onValueChange', field.key, file.url);
        } else {
          // 添加
          emit('onValueChange', field.key, file.url);
        }
        // formRef.value.clearValidate(field.key)
      };
      const handleMultiUploadChange = (file, fileList, type) => {
        const { field } = props;
        const fileUrlList = fileList.map((xx) => xx.url);
        if (type === 'delete') {
        } else if (type === 'doing') {
          // 上传中，因为请求是异步的，所以需要占位
        } else {
          // 添加
        }
        console.log('handleMultiUploadChange  ====> ', fileUrlList);
        emit('onValueChange', field.key, fileUrlList);
        // formRef.value.clearValidate(field.key)
      };
      watchEffect(() => {
        console.log('SetFieldTypeEdit === >watchEffect ====> ', props.data, props.field.key);
        fieldValue.value = getFieldValue();
      });

      return {
        fieldValue,
        dynamicValue,
        colStyle,
        getOptions,
        handleValueChange,
        handleSelectChange,
        handleUploadChange,
        handleMultiUploadChange,
      };
    },
  });
</script>

<style lang="scss" scoped>
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
