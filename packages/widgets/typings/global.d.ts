// global.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    CustomBtn: typeof import('@xdc/widgets')['CustomBtn'];
    DraggableModal: typeof import('@xdc/widgets')['DraggableModal'];
    IndustryUpload: typeof import('@xdc/widgets')['IndustryUpload'];
    SetFieldTypeEdit: typeof import('@xdc/widgets')['SetFieldTypeEdit'];
    SetFieldTypeViewer: typeof import('@xdc/widgets')['SetFieldTypeViewer'];
    SetFormRowEdit: typeof import('@xdc/widgets')['SetFormRowEdit'];
    SetFormRowViewer: typeof import('@xdc/widgets')['SetFormRowViewer'];
    SetFormTypeEdit: typeof import('@xdc/widgets')['SetFormTypeEdit'];
    SetFormTypeViewer: typeof import('@xdc/widgets')['SetFormTypeViewer'];
    SetFormTableEdit: typeof import('@xdc/widgets')['SetFormTableEdit'];
    SetFormTableViewer: typeof import('@xdc/widgets')['SetFormTableViewer'];
  }
}

export {};
