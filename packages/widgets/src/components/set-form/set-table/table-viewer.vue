<template>
  <div class="set-table_viewer">
    <a-table :dataSource="list" :pagination="pagination" @change="handleTableChange">
      <a-table-column title="序号" width="80px" align="center" data-index="index">
        <template #default="{ text, record, index }">
          {{ indexMethod(index) }}
        </template>
      </a-table-column>
      <a-table-column
        v-for="field in fields"
        :key="field.key"
        :data-index="field.key"
        :title="field.label"
        :width="field.width"
      >
        <template #default="{ text, record, index }">
          <!--          {{ record }}-->
          <SetTypeFieldViewer
            v-if="field.type !== 'action'"
            class="set-table_preview_item"
            :field="field"
            :data="record"
            :optionDict="optionDict"
            :showLabel="false"
          />
          <div v-else>
            <template v-if="field.actions">
              <a-button
                v-for="action in field.actions"
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

<script lang="ts">
import { defineComponent, computed, watch, toRefs, ref, reactive, toRaw } from 'vue'
import { FieldTypeViewer } from '@/components/set-form/set-field-type'
import { InfoCircleFilled } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'SetTablePreview',
  components: { SetTypeFieldViewer: FieldTypeViewer, InfoCircleFilled },
  props: {
    fields: {
      type: Array,
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
  },
  setup(props, { emit }) {
    const handleActionClick = (event, action, data) => {
      emit(action.payload, data)
    }
    const list = ref([])
    const values = ref({})

    const handleTableChange = (pager, filters, sorter) => {
      console.log('----->', pager)
      // props.pagination.current = pager.current
      emit('onTableChange', pager, filters, sorter)
      // this.fetchData({})
    }
    const indexMethod = (index) => {
      return (props.pagination.current - 1) * props.pagination.pageSize + index + 1
    }
    watch(
      () => props.dataList,
      (newVal) => {
        list.value = [...newVal]
        const newFormValue = {}
        newVal.forEach((item, index) => {
          props.fields.forEach((field) => {
            newFormValue[`${field.key}_${index}`] = item[field.key]
          })
        })
        values.value = newFormValue
      }
    )

    return { tableFields: [], list, values, indexMethod, handleActionClick, handleTableChange }
  }
})
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
