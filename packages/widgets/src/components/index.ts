import type { App } from 'vue';
import CustomBtn from './custom-btn/index.vue';
import DraggableModal from './draggable-modal/index.vue';
import IndustryUpload from './industry-upload/index.vue';

export { CustomBtn, DraggableModal, IndustryUpload };

const install = (app: App) => {
  app.component(CustomBtn.name, CustomBtn);
  app.component(DraggableModal.name, DraggableModal);
  app.component(IndustryUpload.name, IndustryUpload);
};

/**
 * 组件插件
 */
export const ComponentPlugin = {
  install,
};
