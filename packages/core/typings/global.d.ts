// global.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    GridPanel: typeof import('@xdc/core')['GridPanel'];
    PageContainer: typeof import('@xdc/core')['PageContainer'];
    PageGridContent: typeof import('@xdc/core')['PageGridContent'];
    ProProvider: typeof import('@xdc/core')['ProProvider'];
    SelectLang: typeof import('@xdc/core')['SelectLang'];
    TransformVnode: typeof import('@xdc/core')['TransformVnode'];
  }
}

export {};
