import type { App } from 'vue';
import CustomBtn from './custom-btn/index.vue';
import DraggableModal from './draggable-modal/index.vue';
import IndustryUpload from './industry-upload/index.vue';
import SetFieldTypeEdit from './set-form/set-field-type/edit.vue';
import SetFieldTypeViewer from './set-form/set-field-type/viewer.vue';
import SetFormRowEdit from './set-form/set-form-row/edit.vue';
import SetFormRowViewer from './set-form/set-form-row/viewer.vue';
import SetFormTypeEdit from './set-form/set-form-type/edit.vue';
import SetFormTypeViewer from './set-form/set-form-type/viewer.vue';
import SetFormTableEdit from './set-form/set-form-table/edit.vue';
import SetFormTableViewer from './set-form/set-form-table/viewer.vue';

export {
  CustomBtn,
  DraggableModal,
  IndustryUpload,
  SetFieldTypeEdit,
  SetFieldTypeViewer,
  SetFormRowEdit,
  SetFormRowViewer,
  SetFormTypeEdit,
  SetFormTypeViewer,
  SetFormTableEdit,
  SetFormTableViewer,
};

const install = (app: App) => {
  app.component(CustomBtn.name, CustomBtn);
  app.component(DraggableModal.name, DraggableModal);
  app.component(IndustryUpload.name, IndustryUpload);
  app.component(SetFieldTypeEdit.name, SetFieldTypeEdit);
  app.component(SetFieldTypeViewer.name, SetFieldTypeViewer);
  app.component(SetFormRowEdit.name, SetFormRowEdit);
  app.component(SetFormRowViewer.name, SetFormRowViewer);
  app.component(SetFormTypeEdit.name, SetFormTypeEdit);
  app.component(SetFormTypeViewer.name, SetFormTypeViewer);
  app.component(SetFormTableEdit.name, SetFormTableEdit);
  app.component(SetFormTableViewer.name, SetFormTableViewer);
};

/**
 * 组件插件
 */
export const ComponentPlugin = {
  install,
};
