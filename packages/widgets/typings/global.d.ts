// global.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    CustomBtn: typeof import('@xdc/widgets')['CustomBtn'];
    DraggableModal: typeof import('@xdc/widgets')['DraggableModal'];
    IndustryUpload: typeof import('@xdc/widgets')['IndustryUpload'];
  }
}

export {};
