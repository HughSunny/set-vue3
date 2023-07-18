<template>
  <div class="set-type-field_edit">
    <a-input
      v-if="field.type === 'input'"
      :disabled="field.disabled"
      :style="getFieldStyle"
      v-model:value="fieldValue"
      @change="handleValueChange($event, field.model)"
      :placeholder="field.params?.placeholder || '请输入'"
    >
      <template v-if="field.params?.prepend" #addonBefore>
        {{ field.params?.prepend }}
      </template>
      <template v-if="field.params?.append" #addonAfter>
        <a-select
          v-if="field.params?.append.type === 'select'"
          placeholder="请选择"
          :style="{ width: field.params?.append.params?.width || '100px' }"
          v-model:value="data[field.params?.append.model]"
          :disabled="field.disabled"
          @change="handleSelectChange($event, field.params?.append.model)"
        >
          <a-select-option
            v-for="option in getOptions(field.params?.append, field.params?.append.model)"
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
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
      :placeholder="field.params?.placeholder || ''"
    ></a-textarea>
    <a-input
      v-else-if="field.type === 'number'"
      type="number"
      :disabled="field.disabled"
      v-model.number="fieldValue"
      :style="getFieldStyle"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
      :placeholder="field.params?.placeholder || ''"
    ></a-input>
    <a-radio-group
      v-else-if="field.type === 'radio'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      style="width: 100%"
      @change="handleValueChange($event, field.model)"
      v-bind="field.props"
    >
      <template v-if="!field.colCount">
        <a-radio
          class="wrapCheck"
          v-for="item in getOptions(field, field.model)"
          :key="item.value"
          :value="item.value"
        >
          {{ item.title }}
        </a-radio>
      </template>

      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.model)" :key="item.value">
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
      @change="handleValueChange($event, field.model)"
    >
      <template v-if="!field.colCount">
        <a-row>
          <a-col :span="24" v-for="item in getOptions(field, field.model)">
            <a-checkbox :key="item.value" :value="item.value">
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </template>
      <a-row v-else type="flex" class="flexCheckRow">
        <a-col :style="colStyle" v-for="item in getOptions(field, field.model)" :key="option.value">
          <a-checkbox :value="item.value">
            {{ item.title }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
    <a-select
      v-else-if="field.type === 'select' || field.type === 'multi-select'"
      placeholder="请选择"
      :style="getFieldStyle"
      v-model:value="fieldValue"
      :mode="field.type === 'multi-select' ? 'multiple' : null"
      :disabled="field.disabled"
      @change="handleSelectChange($event, field.model)"
      v-bind="field.props"
    >
      <a-select-option
        v-for="option in getOptions(field, field.model)"
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
      :style="getFieldStyle"
      placeholder="选择日期"
      mode="date"
      value-format="YYYY-MM-DD"
      @change="handleValueChange($event, field.model)"
    ></a-date-picker>

    <a-date-picker
      v-else-if="field.type === 'year'"
      v-model:value="fieldValue"
      :disabled="field.disabled"
      :style="getFieldStyle"
      mode="year"
      format="YYYY 年"
      valueFormat="YYYY"
      placeholder="请选择年"
      picker="year"
      @change="handleValueChange($event, field.model)"
    ></a-date-picker>
    <a-range-picker
      v-else-if="field.type === 'daterange' || field.type === 'monthrange'"
      v-model:value="fieldValue"
      :style="getFieldStyle"
      :disabled="field.disabled"
      :placeholder="[
        `开始${field.type === 'daterange' ? '日期' : '月份'}`,
        `结束${field.type === 'daterange' ? '日期' : '月份'}`,
      ]"
      :format="field.type === 'daterange' ? 'YYYY-MM-DD' : 'YYYY-MM'"
      :value-format="field.type === 'daterange' ? 'YYYY-MM-DD' : 'YYYY-MM'"
      @change="handleValueChange($event, field.model)"
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
      @change="handleSelectChange($event, field.model)"
      style="width: 100%"
    ></a-cascader>
    <slot v-else name="editRender" :field="field">
      <a-input
        :placeholder="field.params?.placeholder || '请输入'"
        :disabled="field.disabled"
        v-model:value="fieldValue"
        @change="otherValueChange($event)"
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
        return props.data[props.dynamicKey || props.field.model];
      };
      const fieldValue = ref(getFieldValue());
      const vValue = props.data[props.dynamicKey || props.field.model];
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
      const getFieldStyle = computed(() => {
        const { field } = props;
        let width = '100%'
        const fieldWidth = field.params?.width
        if (fieldWidth) {
          console.log('----------------------------->fieldWidth', fieldWidth)
          width = fieldWidth
          if (!isNaN(parseFloat(fieldWidth)) && isFinite(fieldWidth)) {
             console.log('----------------------------->parseFloat', fieldWidth)
            width = `${fieldWidth}px`
          }
        }
        return { width }
      })
      const getOptions = (field, model) => {
        const { optionDict } = props;
        return field.options || (optionDict ? optionDict[model || field.model] || [] : []);
      };
      const otherValueChange = (event) => {
        const { field } = props;
        emit('onValueChange', field.model,  event.target.value);
      }
      const handleValueChange = (event, model) => {
        const { field } = props;
        let value = event;
        if (field.type === 'input' || field.type === 'inputArea' || field.type === 'number') {
          value = event.target.value;
        } else if (field.type === 'radio') {
          value = event.target.value;
        }

        emit('onValueChange', model, value);
      };
      const handleSelectChange = (event, model) => {
        emit('onValueChange', model, event);
      };

      const handleUploadChange = (file, fileList, type) => {
        const { field } = props;
        if (type === 'delete') {
          emit('onValueChange', field.model, '');
        } else if (type === 'doing') {
          // 上传中，因为请求是异步的，所以需要占位
          emit('onValueChange', field.model, file.url);
        } else {
          // 添加
          emit('onValueChange', field.model, file.url);
        }
        // formRef.value.clearValidate(field.model)
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
        emit('onValueChange', field.model, fileUrlList);
        // formRef.value.clearValidate(field.model)
      };
      watchEffect(() => {
        console.log('SetFieldTypeEdit === >watchEffect ====> ', props.data, props.field.model);
        fieldValue.value = getFieldValue();
      });

      return {
        fieldValue,
        dynamicValue,
        colStyle,
        getFieldStyle,
        getOptions,
        handleValueChange,
        otherValueChange,
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
