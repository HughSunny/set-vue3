import { App } from 'vue';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import './styles/style.css';
import SetUpload from './components/set-upload/index.vue';
import FieldTypeEdit from './components/set-form/set-field-type/field-type-edit.vue';
import FieldTypeViewer from './components/set-form/set-field-type/field-type-viewer.vue';
import FormRowEdit from './components/set-form/set-form-row/form-row-edit.vue';
import FormRowViewer from './components/set-form/set-form-row/form-row-viewer.vue';
import FormTypeEdit from './components/set-form/set-form-type/form-type-edit.vue';
import FormTypeViewer from './components/set-form/set-form-type/form-type-viewer.vue';

function install(app: App) {
  const packages = [SetUpload,FieldTypeEdit,FieldTypeViewer,FormRowEdit,FormRowViewer,FormTypeEdit,FormTypeViewer];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
const version = '0.0.0';
export { install, version, SetUpload,FieldTypeEdit,FieldTypeViewer,FormRowEdit,FormRowViewer,FormTypeEdit,FormTypeViewer};
export default { install, version};
