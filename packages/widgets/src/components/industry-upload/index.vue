<template>
  <div>
    <a-upload
      v-if="type === 'avatar'"
      :accept="IMG_TYPES.map(xx => xx.suffix).join(',')"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :custom-request="handleUpload"
      :showUploadList="false"
    >
      <a-avatar v-if="loading" :size="45">
        <template #icon>
          <LoadingOutlined></LoadingOutlined>
        </template>
      </a-avatar>

      <template v-else>
        <a-avatar :size="45" v-if="fileLst?.length > 0" :src="fileLst[0].url"></a-avatar>
        <a-avatar :size="45" v-else>
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </template>
    </a-upload>

    <a-upload
      v-else-if="type === 'image'"
      list-type="picture-card"
      :multiple="limit > 1"
      :accept="IMG_TYPES.map(xx => xx.suffix).join(',')"
      action="#"
      :before-upload="beforeUpload"
      :show-upload-list="hideFiles ? !hideFiles : { showPreviewIcon: true, showRemoveIcon: isEdit }"
      @preview="handlePreview"
      @change="handleChange"
      :custom-request="handleUpload"
      v-model:file-list="fileLst"
    >
      <slot name="vector" :loading="loading" :isShow="fileLst.length < limit && isEdit">
        <div v-if="fileLst.length < limit && isEdit">
          <LoadingOutlined v-if="loading"></LoadingOutlined>
          <PlusOutlined v-else />
          <template v-if="!btnTxt">
            <div v-if="loading" class="ant-upload-text">正在上传</div>
            <div v-else class="ant-upload-text">上传</div>
          </template>
          <template v-else>
            {{ loading ? '' : btnTxt }}
          </template>
        </div>
      </slot>
    </a-upload>

    <a-upload
      v-else
      name="file"
      :accept="FILE_TYPES.map(xx => xx.suffix).join(',')"
      :multiple="limit > 1"
      :before-upload="beforeUpload"
      action="#"
      :show-upload-list="hideFiles ? !hideFiles : { showPreviewIcon: true, showRemoveIcon: isEdit }"
      @change="handleChange"
      :custom-request="handleUpload"
      v-model:file-list="fileLst"
    >
      <slot
        name="vector"
        :loading="loading"
        :isShow="(isEdit && hideFiles) || limit === 1 || limit > fileLst.length"
        :outOfLimit="fileOutOfLimit"
      >
        <a-button v-if="isEdit && (hideFiles || limit === 1 || limit > fileLst.length)">
          <LoadingOutlined v-if="loading"></LoadingOutlined>
          <template v-else>
            <upload-outlined />
            {{ fileOutOfLimit ? '重新上传' : '上传' }}
            <template v-if="!btnTxt"> </template>
            <template v-else>
              {{ loading ? '' : btnTxt }}
            </template>
          </template>
        </a-button>
      </slot>
    </a-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { api as viewerApi } from 'v-viewer';

import { message } from 'ant-design-vue';
import { LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons-vue';
import { IMG_TYPES, FILE_TYPES, getFileName } from './index.data';
import { getInitOptions } from '@/index';
interface FileItem {
  name: string;
  url?: string;
  status?: string;
  file?: string | Blob;
  uid?: string;

  response?: string;

  preview?: string;
  originFileObj?: any;
}

defineOptions({ name: 'IndustryUpload' });
const props = defineProps({
  type: {
    type: String,
    default() {
      return 'file';
    },
  },
  libraryName: {
    type: String,
    default() {
      return getInitOptions().uploadLibrary;
    },
  },
  fileUrl: {
    type: String,
    default() {
      return undefined;
    },
  },
  dataList: {
    type: Array,
    default() {
      return [];
    },
  },
  limit: {
    type: Number,
    default() {
      return 1;
    },
  },
  accept: {
    type: Array,
    default: () => [],
  },
  isEdit: {
    type: Boolean,
    default() {
      return true;
    },
  },
  btnTxt: {
    type: String,
    default() {
      return undefined;
    },
  },
  hideFiles: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const emit = defineEmits(['change', 'update:fileUrl', 'update:dataList']);
let files: FileItem[] = [];
if (props.dataList && props.dataList.length > 0) {
  files = props.dataList.map(xx => {
    const tempFile: FileItem = {
      name: getFileName(xx),
      status: 'done',
      url: xx as string,
    };
    return tempFile;
  });
} else {
  if (props.fileUrl) {
    files = [{ name: getFileName(props.fileUrl), status: 'done', url: props.fileUrl }];
  }
}

const fileLst = ref(files);
const loading = ref<boolean>(false);

const fileOutOfLimit = computed(() => {
  return !props.hideFiles && props.limit === 1 && fileLst.value.length > 0;
});

const handleChange = info => {
  // console.log('handleChange--------------------------------->', info)
  if (info.file.status !== 'uploading') {
    console.log('handleChange  uploading ', info.file, info.fileList);
    // 如果网络错误，需要
    // info.fileList.pop()
  }
  if (info.file.status === 'done') {
    // message.success(`${info.file.name} file uploaded successfully`)
  } else if (info.file.status === 'error') {
    // 如果网络错误，需要
    message.error(`${info.file.name} 文件上传失败`);
    info.fileList.pop();
    fileLst.value = info.fileList;
    emit('change', info.file, fileLst.value, 'delete');
  } else if (info.file.status === 'removed') {
    fileLst.value = info.fileList;
    emit('change', info.file, fileLst.value, 'delete');
    if (props.limit <= 1) {
      // imageUrl.value = null
    }
  }
};
// beforeUpload 返回 false 后，手动上传文件。
const beforeUpload = (file: FileItem, fileList) => {
  console.log('beforeUpload=====> ', file, fileList);
  let isLimitAccept = true;
  // 文件个数
  if (props.limit > 1 && fileLst.value.length >= props.limit) {
    message.warning('文件数量超过上限');
    isLimitAccept = false;
  }
  let isFileAccept = true;
  // 文件类型
  if (props.accept.length > 0) {
    const findFileType = !props.accept || props.accept.find(XX => XX.type === file.type);
    if (!findFileType) {
      const text = props.accept.map(item => item.name);
      message.error(`只能上传${text}`, 5);
      isFileAccept = false;
    }
  } else {
    const accepts =
      props.type === 'image' || props.type === 'avatar' ? [...IMG_TYPES] : [...FILE_TYPES];
    const findFileType = accepts.find(XX => XX.type === file.type);
    if (!findFileType) {
      const text = accepts.map(item => item.name);
      message.error(`只能上传${text}`, 5);
      isFileAccept = false;
    }
  }
  const result = isLimitAccept && isFileAccept;
  if (!result) {
    // 如果不符合条件，要把文件列表中不符合的踢掉
    fileList.pop();
  }
  // && !loading.value
  return result;
};
const handleUpload = params => {
  // console.log('handleUpload=====> custom-request 触发 ', params)

  const { file } = params;
  loading.value = true;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const uploadRequest = getInitOptions().uploadRequest;
    if (!uploadRequest) {
      message.error('缺少上传参数');
      return;
    }
    try {
      const ret = await uploadRequest(file, props.libraryName);
      // const { code, data } = ret; //data返回的就是路径
      // if (code !== 0) {
      //   message.error('文件上传失败');
      //   loading.value = false;
      //   fileLst.value.pop();
      //   emit('change', file, fileLst.value, 'delete');
      //   return;
      // }
      const retFilePath = ret;
      // const retFilePath = data.replace('http://localhost:5000/', 'http://10.30.121.131:5000/')
      if (props.limit <= 1) {
        file.url = retFilePath;
        fileLst.value = [file];
        emit('update:fileUrl', retFilePath);
        emit('change', { ...file }, fileLst.value, 'add');
      } else {
        file.url = retFilePath;
        const newFileList = [];
        fileLst.value.forEach(xx => {
          if (xx.uid === file.uid) {
            newFileList.push({ ...file });
          } else {
            newFileList.push({ ...xx });
          }
        });

        fileLst.value = [...newFileList];

        //判断是否全部上传完毕
        if (fileLst.value.filter(xx => xx.url).length === fileLst.value.length) {
          //如果全部上传完毕，才可以返回filelist

          emit('update:dataList', fileLst.value);
          emit('change', { ...file }, fileLst.value, 'add');
        } else {
          //多个没有上传，单个文件单个文件回调，但是filelist是空
          emit('change', { ...file }, [], 'add');
        }
      }
    } catch (e) {
      console.log('oss Upload=====> catch ', e);
      // 将文件列表中的文件pop掉
      fileLst.value.pop();
      emit('change', file, fileLst.value, 'delete');
    } finally {
      loading.value = false;
    }
  };
};
const handlePreview = (file: FileItem) => {
  const initialViewIndex = fileLst.value.indexOf(file);

  viewerApi({
    images: fileLst.value.map(xx => xx.url),
    options: {
      initialViewIndex,
    },
  });
};

watch(
  () => props.fileUrl,
  (val, prevVal) => {
    // console.error('watch fileUrl----------------------------------------------->', val)
    if (val) {
      fileLst.value = [{ name: getFileName(val), status: 'done', url: val }];
    } else {
      fileLst.value = [];
    }
  },
);
watch(
  () => props.dataList,
  (val, prevVal) => {
    // console.error('watch dataList----------------------------------------------->', val)
    if (val && val.length > 0) {
      fileLst.value = val.map(xx => {
        if (xx) {
          const tempFile: FileItem = { name: getFileName(xx), status: 'done', url: xx as string };
          return tempFile;
        }
        return {};
      });
    } else {
      fileLst.value = [];
    }
  },
);
</script>

<style lang="less" scoped>
.btn-rows {
  button {
    margin-right: 12px;
  }
}
</style>
