import { defineStore } from 'pinia';

/**
 * 当前应用全局配置
 */
export interface GlobalStore {
  custom: string;
}

/**
 * 全局数据 store
 */
export const useGlobalStore = defineStore('global', {
  state: (): GlobalStore => {
    return {
      custom: '',
    };
  },
  actions: {
    // 获取当前应用所需数据
    async getInfo() {},
  },
});
