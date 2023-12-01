import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PureSettings } from '@core/interface/IAppSetting'
import { loadLanguageAsync } from '@core/locale'
import ls from '@core/utils/local-storage'
import { AppConfig } from '@core/bo'

export const DEFAULT_PRIMARY_COLOR = '#1677ff'
export const FRAME_DARK_BACKGROUND_COLOR = '#1F2B69' // #001529
export const FRAME_DARK_MENU_SUB_COLOR = '#2b3775' // #001529

export const STORAGE_LANG_KEY = 'lang'
export interface AppState extends PureSettings {
  lang: string
  device: 'mobile' | 'desktop' | string
  loading: boolean
  languageList: any[]
  /**
   * layout架子的主题色, 包括菜单的背景色
   */
  frameDarkBackground: string
  /**
   * layout子菜单的背景色
   */
  frameMenuSubBg: string
}

export const useAppStore = defineStore('app', {
  // https://github.com/prazdevs/pinia-plugin-persistedstate 提供
  persist: true, //process.env.NODE_ENV !== 'production',
  state: (): AppState => ({
    lang: AppConfig.lang,
    device: 'desktop',
    primaryColor: DEFAULT_PRIMARY_COLOR, //主题颜色
    frameDarkBackground: FRAME_DARK_BACKGROUND_COLOR, //layout深色主体下架子的背景色
    frameMenuSubBg: FRAME_DARK_MENU_SUB_COLOR, //layout深色主题下子菜单的背景色颜色
    loading: false,
    languageList:[],
    //antd-pro 系统级设置，已经固定，不需要修改
    layout: 'mix',
    navTheme: 'dark',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixedSidebar: true,
    menu: { locale: false },
    splitMenus: false,
    colorWeak: false,
    transitionName: '',
    multiTab: true,
    multiTabFixed: true //固定tabs页面
  }),
  actions: {
    async SET_LANG(lang) {
      loadLanguageAsync(lang)
        .then(() => {
          AppConfig.lang = lang
          this.lang = lang
          ls.set(STORAGE_LANG_KEY, lang)
        })
        .catch(() => {})
    },
    SET_LOADING(loading: boolean) {
      this.loading = loading
    },
    setLanguageList(list) {
      this.languageList = list || []
    }
  },
  getters: {}
})

// const hot = import.meta.hot || (import.meta as any).hot
// if (hot) {
//   hot.accept(acceptHMRUpdate(useAppStore, hot));
// }
