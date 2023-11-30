export interface ProSettings {
  footerRender?: boolean
  headerRender?: boolean
}

export interface PureSettings {
  primaryColor: string
  /**
   * nav menu position: `side` or `top`
   */
  headerHeight?: number

  /**
   * sticky header
   */
  fixedHeader: boolean
  /**
   * sticky sidebar
   */
  fixedSidebar: boolean
  menu: { locale?: boolean; defaultOpenAll?: boolean }

  colorWeak?: boolean
  splitMenus?: boolean
  
  /**
   * theme for nav menu
   */
  navTheme: 'dark' | 'realDark' | undefined
  /**
   * customize header height
   */
  layout: string // LayoutType
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is top
   */
  contentWidth: 'Fluid' | 'Fixed'

  transitionName: string
  multiTab: boolean
  multiTabFixed: boolean
}
