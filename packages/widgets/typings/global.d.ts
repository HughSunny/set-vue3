// global.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    DraggableModal: typeof import('@xdc/widgets')['DraggableModal'];
    IconPicker: typeof import('@xdc/widgets')['IconPicker'];
    IndustryUpload: typeof import('@xdc/widgets')['IndustryUpload'];
    SetUpload: typeof import('@xdc/widgets')['SetUpload'];
    SetFieldTypeEdit: typeof import('@xdc/widgets')['SetFieldTypeEdit'];
    SetFieldTypeViewer: typeof import('@xdc/widgets')['SetFieldTypeViewer'];
    SetFormRowEdit: typeof import('@xdc/widgets')['SetFormRowEdit'];
    SetFormRowViewer: typeof import('@xdc/widgets')['SetFormRowViewer'];
    SetFormTypeEdit: typeof import('@xdc/widgets')['SetFormTypeEdit'];
    SetFormTypeViewer: typeof import('@xdc/widgets')['SetFormTypeViewer'];
  }
}

export {};
