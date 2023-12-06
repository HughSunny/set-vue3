<template>
  <page-grid-content class="pageContainer">
    <div class="white-page padding-page">
      <a-form
        v-if="searchSchemas && searchSchemas.length > 0"
        ref="rowFormRef"
        layout="horizontal"
        :model="searchState"
      >
        <SetFormRowEdit
          :data="searchState"
          :form="rowFormRef"
          :fields="searchSchemas"
          col-type="6-col"
          :right-append-col="{
            sm: 24,
            md: {
              span: 12,
            },
            lg: {
              span: 12,
            },
            xl: {
              offset: 12,
              span: 6,
            },
          }"
          @onValueChange="handleSearchChange"
        >
          <template #rightAppend>
            <a-space>
              <a-button type="primary" @click="handleSearch">
                <template #icon> <SearchOutlined /> </template>{{ $t('sys.action.query') }}
              </a-button>
              <a-button @click="handleReset"
                ><template #icon><reload-outlined /></template
                >{{ $t('sys.action.reset') }}</a-button
              >
            </a-space>
          </template>
        </SetFormRowEdit>
      </a-form>
      <div class="table-top-row">
        <a-space>
          <IndustryUpload v-has:sysFile001 hide-files @change="handleUploadChange">
            <template #vector="{ loading, isShow }">
              <a-button v-if="isShow" type="primary">
                <LoadingOutlined v-if="loading"></LoadingOutlined>
                <template v-else>
                  <upload-outlined />
                  {{ '上传' }}
                </template>
              </a-button>
            </template>
          </IndustryUpload>
          <!-- <IndustryUpload type = "image" file-url="http://10.30.121.131:5000/Files/logo.png" :limit="3"  @change="handleUploadChange"/> -->
          <!-- <a-button type="primary" @click="handleAdd"
            ><PlusOutlined />{{ $t('sys.action.new') }}</a-button
          > -->
        </a-space>
      </div>

      <a-table
        :columns="tableColumns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="state.listLoading"
        bordered
        size="middle"
        @change="handleTableChange"
      >
        <template #bodyCell="{ text, column, index, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <!-- <a @click="handleEdit(record)">{{ $t('sys.action.edit') }}</a> -->
              <a-popconfirm
                :title="`${$t('sys.action.confirmDeleteThis')}${$t(entityName)}`"
                @confirm="handleDelete(record.id)"
              >
                <a-button v-has:sysFile002 type="text" danger size="small">{{
                  $t('sys.action.delete')
                }}</a-button>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-if="column.dataIndex === 'enabled'">
            <a-badge
              :status="text ? 'success' : 'error'"
              :text="$t(text ? 'sys.status.enable' : 'sys.status.disable')"
            />
          </template>
          <template v-if="column.dataIndex === 'createdTime'">
            {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </template>
      </a-table>
    </div>
    <EditModal
      :id="state.currentEntityId"
      v-model:visible="state.showEditModal"
      @editCallback="handleEditCallback"
    ></EditModal>
  </page-grid-content>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from '@xdc/core';
import { entityName, searchSchemas, tableColumns } from './index.data';
import EditModal from './index.edit.vue';
import { useEntityDataOperation } from './index.hook';

const { t } = useI18n();
const { getEntityList, delEntity, refreshEntityCache } = useEntityDataOperation();
const state = reactive({
  listLoading: false,
  showEditModal: false,
  currentEntityId: null,
});
const dataSource = ref([]);
const listQuery = reactive({});
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showTotal: (total, range) => {
    return t('sys.constant.totalCount', total);
  },
});
onMounted(() => {
  fetchData();
});
const rowFormRef = ref();
const defaultSearch = {
  fileName: undefined,
};

const handleUploadChange = (file, fileList, type) => {
  if (type === 'add' && file) {
    handleSearch();
  }
};
const searchState = reactive({
  ...defaultSearch,
});
const handleSearch = () => {
  pagination.current = 1;
  fetchData();
};
const handleReset = () => {
  Object.keys(defaultSearch).forEach(key => {
    searchState[key] = defaultSearch[key];
  });
  handleSearch();
};
const handleSearchChange = (key, event) => {
  //设置值变化，监控数据
  // console.log('handleSearchChange ===============================>', key, event)
  if (key === 'enable') {
    handleSearch();
  }
};
const handleTableChange = (pager, filters, sorter) => {
  pagination.current = pager.current;
  pagination.pageSize = pager.pageSize;
  fetchData();
};
const handleDelete = id => {
  delEntity(id).then(res => {
    pagination.current = 1;
    fetchData(true);
  });
};
const handleEdit = record => {
  state.currentEntityId = record.id;
  state.showEditModal = true;
};
const handleEditCallback = entity => {
  console.log('handleEditCallback ====>', entity);
  pagination.current = 1;
  fetchData();
};

const fetchData = async (refreshCache = false) => {
  state.listLoading = true;
  const data = await getEntityList({
    ...listQuery,
    ...toRaw(searchState),
    pageSize: pagination.pageSize,
    current: pagination.current,
  });
  dataSource.value = data.items;
  pagination.total = data.count;
  state.listLoading = false;
  if (refreshCache) {
    refreshEntityCache(data.items);
  }
};
</script>
<style lang="less" scoped>
.pageContainer {
  ::v-deep(.ant-page-header-heading-extra) {
    margin-bottom: -10px !important;
  }
}
.searchForm {
}
</style>
