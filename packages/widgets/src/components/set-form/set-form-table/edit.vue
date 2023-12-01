<template>
  <a-form ref="setTableFormRef" :model="values">
    <div v-if="addPosition !== 'bottom'" class="set-table_edit_top_add">
      <a-button type="primary" @click="handleAddItem"
        ><plus-outlined /> {{ $t('sys.action.newAdd') }}</a-button
      >
    </div>
    <a-table
      :dataSource="list"
      style="width: 100%"
      size="small"
      :header-cell-style="headerStyle"
      :pagination="false"
      v-bind="$attrs"
      class="set-table_edit"
    >
      <template v-for="(slot, name) in $slots" :key="name" #[name]>
        <slot :name="name" v-bind="slot"></slot>
      </template>

      <a-table-column label="序号" width="80" align="center" v-if="showIndex">
        <template #default="{ text, record, index }">
          <span>{{ index + 1 }}</span>
        </template>
      </a-table-column>
      <a-table-column
        v-for="field in fields"
        :key="field.model"
        :data-index="field.model"
        :title="field.label"
        :width="field.width"
        v-bind="field.tableProps"
      >
        <template #default="{ text, record, index }">
          <SetFormTypeEdit
            v-if="field.type !== 'action'"
            class="set-table_edit_item"
            v-model:value="values[`${field.model}_${index}`]"
            :field="field"
            :optionDict="optionDict"
            :data="values"
            :dynamicKey="`${field.model}_${index}`"
            :showLabel="false"
            :error="errors[`${field.model}_${index}`]"
            @onValueChange="(key, event) => handleValueChange(key, event, index, record)"
          />
          <div v-else>
            <a-button
              v-if="record.editable"
              @click.prevent="deleteItem(index, list)"
              type="text"
              size="small"
              danger
            >
              {{ $t('sys.action.delete') }}
            </a-button>
            <template v-if="field.tableActions">
              <a-button
                v-for="(action, i) in field.tableActions"
                :key="i"
                type="text"
                size="small"
                @click="handleActionClick($event, action, record, index)"
              >
                {{ $t(action.name) }}
              </a-button>
            </template>
          </div>
        </template>
      </a-table-column>
    </a-table>
    <a-button
      v-if="addPosition === 'bottom'"
      @click="handleAddItem"
      class="set-table_edit_bottom_add"
    >
      <plus-outlined /> {{ $t('sys.action.newAdd') }}</a-button
    >
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import { SetFieldType, type SetFormTableField } from '@/entity/set-form';
const emit = defineEmits(['onTableChange', 'onActionClick'])
defineOptions({
  name: 'SetTableEdit'
})

const props = defineProps({
  fields: {
    type: Array<SetFormTableField>,
    default: function () {
      return [] as SetFormTableField[]
    }
  },
  dataList: {
    type: Array,
    default: function () {
      return []
    }
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  optionDict: {
    type: Object,
    default: function () {
      return {}
    }
  },
  addPosition: {
    type: String,
    default: 'bottom'
  },
  headerStyle: {
    type: Object,
    default: function () {
      return {
        'background-color': '#E8E8E8',
        color: '#101010'
      }
    }
  },
  errors: {
    type: Object,
    default() {
      return {}
    }
  }
})
const setTableFormRef = ref()
const autoCount = ref(props.dataList.length)
const newFormValue = {}
const newTableData = []
props.dataList.forEach((item, index) => {
  props.fields.forEach((field) => {
    newFormValue[`${field.model}_${index}`] = item[field.model]
  })
  const newTableItem = Object.assign({}, item, { zIndex: index })
  newTableData.push(newTableItem)
})
const list = ref(newTableData)

const values = reactive(newFormValue)

watch(
  () => props.dataList,
  (newVal) => {
    Object.assign(values, {})
    const newTableData = []
    newVal.forEach((item, index) => {
      props.fields.forEach((field) => {
        values[`${field.model}_${index}`] = ref(item[field.model])
      })
      const newTableItem = Object.assign({}, item, { zIndex: index })
      newTableData.push(newTableItem)
    })
    list.value = newTableData
    autoCount.value = newVal.length
  }
)

watch(
  () => props.fields,
  (newVal) => {
    // notice： 带rules的值 不带append
    // console.log('watch fields', newVal, oldVal);
  }
)

// 新增数据
const handleAddItem = () => {
  const length = autoCount.value
  const rules = {}
  let item = {
    isEdit: true,
    editable: true,
    id: null,
    zIndex: length
  }
  props.fields.forEach((field) => {
    item[`${field.model}`] = undefined
    rules[`${field.model}_${item.zIndex}`] = field.rules
    values[`${field.model}_${item.zIndex}`] = ref(item[field.model])
  })
  list.value = list.value.concat([item])
  autoCount.value = autoCount.value + 1
  // console.log('---------------->', list.value)
  emit('onTableChange', item, list.value, 'add')
}

// 删除数据
const deleteItem = (index, list) => {
  const findItem = list.splice(index, 1)[0]
  props.fields.forEach((field) => {
    values[`${field.model}_${index}`] = undefined
    delete values[`${field.model}_${index}`]
  })
  emit('onTableChange', findItem, list.value, 'delete')

  // setTableFormRef.value.clearValidate()
}

const handleValueChange = (key, event, index, row) => {
  // 传值的新方式
  // 修改list中的值
  const findItem = list.value[index]
  findItem[key] = event

  // 下下策 文件触发校验的时机有问题，所以在设置值之后需要清空校验
  const fieldMatch = props.fields.find((field) => field.model === key)
  // console.log('---------------handleValueChange', values)
  if (fieldMatch && fieldMatch.type.indexOf('ile') !== -1) {
    setTableFormRef.value.validateFields([`${key}_${findItem.zIndex}`])
    // rowFormRef.value.clearValidate(key)
  }
}

const handleActionClick = (event, action, data, position) => {
  emit(action.payload, data, position)
}

const edit = (index, row) => {
  // this.$set(row, 'isEdit', true)
}
const editSuccess = (index, row) => {
  // this.$set(row, 'isEdit', false)
}

const validate = (callback) => {
  setTableFormRef.value.validate(callback)
}
const asyncValidate = () => {
  return setTableFormRef.value.validate()
}

const clearValidate = () => {
  setTableFormRef.value.clearValidate()
}

const getResult = () => {
  return list.value.map((item) => ({
    ...item,
    isEdit: null
  }))
}
defineExpose({
  validate,
  asyncValidate,
  clearValidate,
  getResult
})
</script>
<style scoped lang="less">
.set-table_edit {
  ::v-deep(.ant-table-tbody > tr > td) {
    padding: 0 16px;
  }
}

.set-table_edit_item {
  margin-top: 24px;
}
.set-table_edit_top_add {
}
/*.set-table-form_header {*/
/*  background-color: #E8E8E8;*/
/*  color: #101010;*/
/*}*/
.set-table_edit_bottom_add {
  text-align: center;
  width: 100%;
  margin-top: 5px;
  border: 1px dashed #e8eaec;
  color: rgba(193, 196, 203, 1);
}
</style>
