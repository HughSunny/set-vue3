<template>
  <draggable-modal
    :open="visible"
    :closable="false"
    :title="modalTitle"
    width="600px"
    :ok-text="$t('sys.action.save')"
    @ok="handleSave"
    @cancel="handleCancel"
  >
    <div class="xdc-modal-main">
      <a-form
        ref="formRef"
        layout="horizontal"
        :model="detail"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <SetFormRowEdit
          :form="formRef"
          :data="detail"
          :fields="formSchemas"
          :option-dict="optionDict"
          @onValueChange="handleFormValueChange"
        />
      </a-form>
    </div>
  </draggable-modal>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from '@xdc/core';
import { defaultValue, entityName, entitySchemas } from './index.data';
import { useEntityDataOperation } from './index.hook';

const { createEntity, updateEntity, getEntityById } = useEntityDataOperation();
const props = defineProps(['id', 'position', 'visible']);
const emits = defineEmits(['update:visible', 'editCallback']);
const formRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 16 };
const { t } = useI18n();
const modalTitle = computed(() => {
  return t(props.id ? 'sys.action.modify' : 'sys.action.new') + t(entityName);
});
const optionDict = computed(() => {
  return {};
});
const formSchemas = ref(
  props.id ? entitySchemas.filter(xx => xx.model != 'password') : entitySchemas,
);

const detail = reactive({
  ...defaultValue,
});
const fetchData = id => {
  getEntityById(id).then(ret => {
    Object.keys(defaultValue).forEach(key => {
      detail[key] = ret[key];
    });
  });
};

const handleFormValueChange = (key, event) => {};

const handleSave = () => {
  formRef.value.validate().then(valid => {
    if (valid) {
      const commitValue = { id: props.id, ...detail };
      if (props.id) {
        updateEntity(props.id, commitValue).then(data => {
          emits('editCallback', {
            ...commitValue,
          });
          emits('update:visible', false);
        });
      } else {
        createEntity(commitValue).then(data => {
          emits('editCallback', {
            ...commitValue,
            id: data?.id,
          });
          emits('update:visible', false);
        });
      }
    }
  });
};

const handleClear = () => {
  Object.keys(defaultValue).forEach(key => {
    detail[key] = defaultValue[key];
  });
  // detail.value = { ...defaultValue }
};

onMounted(() => {
  if (props.id) {
    fetchData(props.id);
  }
});
watch(
  () => props.id,
  (newVal, oldVal) => {
    console.log('EntityEdit edit watch', newVal, oldVal);
    formSchemas.value = newVal ? entitySchemas.filter(xx => xx.model != 'password') : entitySchemas;
  },
);

watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      if (props.id) {
        fetchData(props.id);
      } else {
        handleClear();
      }
    }
  },
);

// 取消
const handleCancel = () => {
  formRef.value.clearValidate();
  // Object.keys(defaultValue).forEach((key) => {
  //   detail[key] = defaultValue[key]
  // })
  emits('update:visible', false);
};

defineExpose({
  handleSave,
});
</script>
<style></style>
