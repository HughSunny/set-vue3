import type { App } from 'vue'
import Exception403 from './exception/403.vue'
import Exception404 from './exception/404.vue'
import Exception500 from './exception/500.vue'
import BlankPage from './BlankPage.vue'
import LeadLogin from './login'

export { BlankPage, Exception403, Exception404, Exception500 }

const install = (app: App) => {
  app.component(LeadLogin.name, LeadLogin)
  // 如果导出成组件的，那么就这里注册组件
}

/**
 * 页面
 */
export const ViewsPlugin = {
  install
}
