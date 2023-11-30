import type { App } from 'vue';
import DraggableModal from './draggable-modal';
import IconPicker from './icon-picker';
import IndustryUpload from './industry-upload';
import SetUpload from './set-upload/index.vue';
import SetFieldTypeEdit from './set-form/set-field-type/edit.vue';
import SetFieldTypeViewer from './set-form/set-field-type/viewer.vue';
import SetFormRowEdit from './set-form/set-form-row/edit.vue';
import SetFormRowViewer from './set-form/set-form-row/viewer.vue';
import SetFormTypeEdit from './set-form/set-form-type/edit.vue';
import SetFormTypeViewer from './set-form/set-form-type/viewer.vue';

export {
  DraggableModal,
  IconPicker,
  IndustryUpload,
  SetUpload,
  SetFieldTypeEdit,
  SetFieldTypeViewer,
  SetFormRowEdit,
  SetFormRowViewer,
  SetFormTypeEdit,
  SetFormTypeViewer,
};

const install = (app: App) => {
  app.component(DraggableModal.name, DraggableModal);
  app.component(IconPicker.name, IconPicker);
  app.component(IndustryUpload.name, IndustryUpload);
  app.component(SetUpload.name, SetUpload);
  app.component(SetFieldTypeEdit.name, SetFieldTypeEdit);
  app.component(SetFieldTypeViewer.name, SetFieldTypeViewer);
  app.component(SetFormRowEdit.name, SetFormRowEdit);
  app.component(SetFormRowViewer.name, SetFormRowViewer);
  app.component(SetFormTypeEdit.name, SetFormTypeEdit);
  app.component(SetFormTypeViewer.name, SetFormTypeViewer);
};

/**
 * 组件插件
 */
export const ComponentPlugin = {
  install,
};
