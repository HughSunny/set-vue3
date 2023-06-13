<template>
  <div>
    <a-upload
      v-if="type === 'avatar'"
      :accept="IMG_TYPES.map((xx)=>xx.suffix).join(',')"
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
      :accept="IMG_TYPES.map((xx)=>xx.suffix).join(',')"
      action="#"
      :before-upload="beforeUpload"
      :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: isEdit }"
      @preview="handlePreview"
      @change="handleChange"
      :custom-request="handleUpload"
      :showUploadList="!hideFiles"
      v-model:file-list="fileLst"
    >
      <div v-if="(fileLst.length < limit) && isEdit">
        <LoadingOutlined v-if="loading"></LoadingOutlined>
        <PlusOutlined v-else />
        <template v-if="!btnTxt">
          <div v-if="loading" class="ant-upload-text">正在上传</div>
          <div v-else class="ant-upload-text">上传</div>
        </template>
        <template v-else>
          {{ loading ? "" : btnTxt }}
        </template>
      </div>
    </a-upload>

    <a-upload
      v-else
      name="file"
      :accept="FILE_TYPES.map((xx)=>xx.suffix).join(',')"
      :multiple="limit > 1"
      :before-upload="beforeUpload"
      action="#"
      :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: isEdit }"
      @change="handleChange"
      :custom-request="handleUpload"
      :showUploadList="!hideFiles"
      v-model:file-list="fileLst"
    >
      <a-button v-if="isEdit &&  (hideFiles || (limit === 1 || limit > fileLst.length))">
        <LoadingOutlined v-if="loading"></LoadingOutlined>
        <template v-else>
          <upload-outlined />
          <template v-if="!btnTxt">
            {{ !hideFiles && limit === 1 && fileLst.length > 0 ? "重新上传" : "上传" }}
          </template>
          <template v-else>
            {{ loading ? "" : btnTxt }}
          </template>
        </template>
      </a-button>
    </a-upload>
    <!--    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">-->
    <!--      <img alt="imagePreview" style="width: 100%" :src="previewImage" />-->
    <!--    </a-modal>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, inject, watch, watchEffect } from "vue";
import { Alert, message, Modal, Tooltip, Upload } from "ant-design-vue";
import { LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons-vue";
import { upload } from "@/api/oss";

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  preview?: string
  originFileObj?: any
  file: string | Blob
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const FILE_TYPES = [
  { type: "application/pdf", name: "PDF", suffix: '.pdf' },
  { type: "image/jpeg", name: "JPEG,JPG", suffix: '.jpg' },
  { type: "image/png", name: "PNG", suffix: '.png' },
  { type: "image/gif", name: "GIF", suffix: '.gif' },
  { type: "application/msword", name: "DOC", suffix: '.doc'  },
  // { type: 'application/msexcel', name: 'XLSX' },
  { type: 'image/svg+xml', name: 'SVG' },
  { type: "application/vnd.ms-excel", name: "XLS", suffix: '.xls'  },
  { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", name: "DOCX", suffix: 'docx' },
  { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name: "XLSX", suffix: '.xlsx'  },
  { type: "application/zip", name: "ZIP", suffix: '.zip' },
  { type: "application/x-rar", name: "RAR", suffix: '.rar' },
];

export const IMG_TYPES = [
  { type: "image/jpeg", name: "JPEG,JPG", suffix: '.jpg'  },
  { type: "image/png", name: "PNG", suffix: '.png'  },
  { type: "image/gif", name: "GIF", suffix: '.gif' },
  { type: 'image/svg+xml', name: 'SVG' },
];
const getFileName = (url) => {
  if (url && url.startsWith("#")) {
    return "...";
  }
  const extIndex = url.lastIndexOf(".");
  const fileExt = url.substring(extIndex + 1);
  const file1 = url.substring(url.lastIndexOf("/") + 1, extIndex);
  const file2 = file1.substring(file1.indexOf("_") + 1);
  return `${file2}.${fileExt}`;
};
export default defineComponent({
  name: "SetUpload",
  components: {
    [Alert.name]: Alert,
    [Upload.name]: Upload,
    [Modal.name]: Modal,
    [Tooltip.name]: Tooltip,
    UploadOutlined,
    PlusOutlined,
    LoadingOutlined,
    UserOutlined,
  },
  props: {
    type: {
      type: String,
      default() {
        return "file";
      },
    },
    libraryId: {
      type: String,
      default() {
        return undefined;
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
  },
  setup(props, context) {

    const requestMethod = inject('mix-cms-request-method');
    const uploadMethod = inject('mix-upload-method');
    // 不用了
    const imageUrl = ref<string>(props.fileUrl);
    let files = [];
    if (props.dataList && props.dataList.length > 0) {
      files = [...props.dataList.map((xx) => {
        return {
          name: getFileName(xx), status: "done", url: xx,
        };
      })];
    } else {
      if (props.fileUrl) {
        files = [{ name: getFileName(props.fileUrl), status: "done", url: props.fileUrl }];
      }
    }

    const fileLst = ref(files);
    const loading = ref<boolean>(false);

    const handleChange = (info) => {
      console.log("handleChange--------------------------------->", info);
      if (info.file.status !== "uploading") {
        console.log("handleChange  uploading ", info.file, info.fileList);
        // 如果网络错误，需要
        // info.fileList.pop()
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        // 如果网络错误，需要
        message.error(`${info.file.name} 文件上传失败`);
        info.fileList.pop();
        fileLst.value = info.fileList;
        context.emit("onChange", info.file, fileLst.value, "delete");
      } else if (info.file.status === "removed") {
        fileLst.value = info.fileList;
        context.emit("onChange", info.file, fileLst.value, "delete");
        if (props.limit <= 1) {
          imageUrl.value = null;
        }
      }
    };
    // beforeUpload 返回 false 后，手动上传文件。
    const beforeUpload = (file: FileItem, fileList) => {
      console.log("beforeUpload=====> ", file, fileList);
      let isLimitAccept = true;
      // 文件个数
      if (props.limit > 1 && fileLst.value.length >= props.limit) {
        message.warning("文件数量超过上限");
        isLimitAccept = false;
      }
      let isFileAccept = true;
      // 文件类型
      if (props.accept.length > 0) {
        const findFileType = !props.accept || props.accept.find((XX) => XX.type === file.type);
        if (!findFileType) {
          const text = props.accept.map((item) => item.name);
          message.error(`只能上传${text}`, 5);
          isFileAccept = false;
        }
      } else {
        const accepts = props.type === "image" || props.type === "avatar" ? [...IMG_TYPES] : [...FILE_TYPES];
        const findFileType = accepts.find((XX) => XX.type === file.type);
        if (!findFileType) {
          const text = accepts.map((item) => item.name);
          message.error(`只能上传${text}`, 5);
          isFileAccept = false;
        }
      }
      const result = isLimitAccept && isFileAccept;
      if (!(result)) {
        // 如果不符合条件，要把文件列表中不符合的踢掉
        fileList.pop();
      }
      // && !loading.value
      return result;
    };
    const handleUpload = (params) => {
      console.log("handleUpload=====> custom-request 触发 ", params);

      const { file } = params;
      loading.value = true;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadMethod({ file, type: props.type === 'image' ? 'Media' : 'Attachment', libraryId : props.libraryId }, requestMethod)
        // upload(file, props.type === "image" ? "Media" : "Attachment", props.libraryId)
          .then((ret) => {
            console.log("oss Upload=====> ", ret);
            // fileLst.value = [...fileLst.value, { ...file, url: ret.filePath }]
            if (props.limit <= 1) {
              imageUrl.value = ret.filePath;
              file.url = ret.filePath;
              fileLst.value = [file];
            } else {
              file.url = ret.filePath;
              const newFileList = [];
              fileLst.value.forEach((xx => {
                if (xx.uid === file.uid) {
                  newFileList.push({ ...file });
                } else {
                  newFileList.push({ ...xx });
                }
              }));

              fileLst.value = [...newFileList];
            }
            context.emit("onChange", { ...file, ...ret }, fileLst.value, "add");
            loading.value = false;
          })
          .catch((e) => {
            console.log("oss Upload=====> catch ", e);
            // 将文件列表中的文件pop掉
            loading.value = false;
            fileLst.value.pop();
            context.emit("onChange", file, fileLst.value, "delete");
          });
      };
    };

    watch(
      () => props.fileUrl,
      (val, prevVal) => {
        if (val) {
          fileLst.value = [{ name: getFileName(val), status: "done", url: val }];
        } else {
          fileLst.value = [];
        }

        // if (props.limit <= 1) {
        //   imageUrl.value = val
        // } else {
        //  fileLst.value = [{ name: 'image.png', status: 'done', url: val }]
        // }
      },
    );
    watch(
      () => props.dataList,
      (val, prevVal) => {
        if (val && val.length > 0) {
          fileLst.value = [...val.map((xx) => {
            return {
              name: getFileName(xx), status: "done", url: xx,
            };
          })];
        } else {
          fileLst.value = [];
        }
      },
    );
    return {
      loading,
      imageUrl,
      fileLst,
      handleChange,
      beforeUpload,
      handleUpload,
      IMG_TYPES,
      FILE_TYPES,
    };
  },
  methods: {
    handlePreview(file: FileItem) {
      const initialViewIndex = this.fileLst.indexOf(file);
      this.$viewerApi({
        images: this.fileLst.map(xx => xx.url),
        options: {
          initialViewIndex,
        },
      });
    },
  },
});
</script>

<style lang="less" scoped>
.btn-rows {
  button {
    margin-right: 12px;
  }
}
</style>
