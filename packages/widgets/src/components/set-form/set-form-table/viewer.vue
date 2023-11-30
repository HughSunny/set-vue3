<template>
  <div class="set-table_viewer">
    <a-table :dataSource="dataList" v-bind="$attrs" :pagination="pagination">
      <a-table-column title="序号" width="80px" align="center" data-index="index" v-if="showIndex">
        <template #default="{ text, record, index }">
          {{ indexMethod(index) }}
        </template>
      </a-table-column>
      <a-table-column
        v-for="field in fields"
        :key="field.model"
        :data-index="field.model"
        :title="field.label"
        :width="field.width"
      >
        <template #default="{ text, record, index }">
          <FieldTypeViewer
            v-if="field.type !== 'action'"
            class="set-table_preview_item"
            :field="field"
            :data="record"
            :optionDict="optionDict"
            :showLabel="false"
          />
          <div v-else>
            <template v-if="field.tableActions">
              <a-button
                v-for="action in field.tableActions"
                :key="action.name"
                type="link"
                size="small"
                @click="handleActionClick($event, action, record)"
              >
                {{ action.name }}
              </a-button>
            </template>
          </div>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SetTableViewer'
})
import { SetFieldType, type SetFormTableField } from '../../../entity/set-form';
import { FieldTypeViewer } from '../../../components/set-form'
const props = defineProps({
  fields: {
    type: Array<SetFormTableField>,
    default() {
      return []
    }
  },
  dataList: {
    type: Array,
    default() {
      return []
    }
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  optionDict: {
    type: Object,
    default() {
      return []
    }
  },
  pagination: {
    type: Object,
    default() {
      return { current: 1, pageSize: 20, total: 0, showSizeChanger: false }
    }
  }
})
const emit = defineEmits(['onTableChange', 'onActionClick'])

const indexMethod = (index) => {
  return (props.pagination.current - 1) * props.pagination.pageSize + index + 1
}
const handleActionClick = (event, action, data) => {
  emit(action.payload, data)
}
</script>

<style lang="less" scoped>
.set-table_preview_item {
  .antd-form-item {
    margin: 0;
  }

  .antd-form-item__content {
    span {
      color: #606266;
    }
  }
}
</style>
