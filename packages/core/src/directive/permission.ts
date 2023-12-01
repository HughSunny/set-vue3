import type { App } from 'vue'
import { cloneDeep } from 'lodash-es'
import { AppConfig } from '@core/bo/app-config'

/**
 * 是否有显示权限，替代不支持 v-action-enable 指令的组件
 * @param context vue实例，即当前this或ctx
 * @param keys 操作权限 key
 * @returns 授权策略 visible:可见 invisible:不可见 enable:启用 disabled:禁用
 */
export function hasVisiblePermission(context, keys: string | string[]): boolean {
  const { permissions } = context.$route.meta || {}
  if (!permissions || !keys) {
    return false
  }

  const pKeys = Array.isArray(keys) ? keys : [keys]
  if (pKeys.length === 0) {
    return false
  }

  return (
    Object.keys(permissions).filter(
      (s) => pKeys.includes(s) && ['visible'].includes(permissions[s]?.type)
    ).length > 0
  )
}

/**
 * 是否有可用权限，替代不支持 v-action-enable 指令的组件
 * @param context vue实例，即当前this或ctx
 * @param keys 操作权限 key
 */
export function hasEnablePermission(context, keys: string | string[]): boolean {
  const { permissions } = context.$route.meta || {}
  if (!permissions || !keys) {
    return false
  }

  const pKeys = Array.isArray(keys) ? keys : [keys]
  if (pKeys.length === 0) {
    return false
  }

  return (
    Object.keys(permissions).filter(
      (s) => pKeys.includes(s) && ['enable'].includes(permissions[s]?.type)
    ).length > 0
  )
}

/**
 * 是否有效操作权限，替代不支持 v-action 指令的组件，使用 v-if 指令，结合 hasActionDisabledPermission
 * @param context vue实例，即当前this或ctx
 * @param key 操作权限 key
 */
export function hasActionIfPermission(context, key: string): boolean {
  const type = getActionPermissionType(context, key)

  if (['invisible', 'visible'].includes(type)) {
    return type === 'visible'
  }

  return true
}

/**
 * 是否有效操作权限，替代不支持 v-action 指令的组件，使用 v-if 指令，结合 hasActionDisabledPermission
 * @param context vue实例，即当前this或ctx
 * @param key 操作权限 key
 */
export function hasActionDisabledPermission(context, key: string): boolean {
  const type = getActionPermissionType(context, key)

  if (['enable', 'disabled'].includes(type)) {
    return type === 'disabled'
  }

  return false
}

/**
 * 是否有效操作权限 visible/enable
 * @param context vue实例，即当前this或ctx
 * @param keys 操作权限 key
 */
export function hasActionPermission(context, keys: string | string[]): boolean {
  const { permissions } = context.$route.meta || {}
  if (!permissions || !keys) {
    return false
  }

  const pKeys = Array.isArray(keys) ? keys : [keys]
  if (pKeys.length === 0) {
    return false
  }

  return (
    Object.keys(permissions).filter(
      (s) => pKeys.includes(s) && ['visible', 'enable'].includes(permissions[s]?.type)
    ).length > 0
  )
}

/**
 * 获取有效权限的key
 * @param context vue实例，即当前this或ctx
 * @param routeName 路由name
 */
export function getActionPermissionKeys(context, routeName?: string): string[] {
  const name = routeName || context.$route.name
  const permissions = (AppConfig.opPermission || {})[name]
  if (!permissions) {
    return []
  }
  return Object.keys(permissions).filter((k) =>
    ['visible', 'enable'].includes(permissions[k]?.type)
  )
}

/**
 * 是否有按钮操作权限，如果没有设置权限则为不可见 invisible
 * @param context vue实例，即当前this或ctx
 * @param key 当前要判断的权限key
 * @returns 授权策略 visible:可见 invisible:不可见 enable:启用 disabled:禁用
 */
function getActionPermissionType(context, key: string): string | undefined {
  if (context.$route) {
    // 路由判断
    const { permissions } = context.$route?.meta || {}
    if (!permissions) {
      //20231109 如果没有权限控制permissions对象，则隐藏
      return 'invisible'
    }
    const { type } = permissions[key] || {}
    return type || 'invisible'
  } else {
    // 缓存判断
    const permissionObj = AppConfig.opPermission[AppConfig.currentMenuName]
    if (!permissionObj) {
      // console.log('------------------> 无法获取当前路由信息, $route 没有expose')
      //20231109 如果没有权限控制permissions对象，则隐藏
      return 'invisible'
    }
    const { type } = permissionObj[key] || {}
    return type || 'invisible'
  }
  // if (!context.$route) {
  //   console.log('------------------> 无法获取当前路由信息, $route 没有expose')
  //   return
  // }
}

/**
 * 判断是否有指定页面访问权限，可替代 v-menu 指令
 * @param context vue实例，即当前this或ctx
 * @param routeName 当前要判断的路由name，未指定取当前路由
 */
export function hasMenuPermission(context, routeName: string): boolean {
  const permissions = AppConfig.opPermission || {}
  return !!(permissions || {})[routeName]
}

/**
 * 根据路由名称获取菜单按钮权限清单
 * @param context vue实例，即当前this
 * @param routeName 当前要判断的路由name，未指定取当前路由
 */
export function getMenuActionPermissions(context, routeName: string): Record<string, any> {
  const permissions = AppConfig.opPermission || {}
  return cloneDeep((permissions || {})[routeName]) || {}
}

/**
 * 根据路由名称和按钮key获取权限
 * @param context vue实例，即当前this
 * @param routeName 当前要判断的路由name，未指定取当前路由
 * @param buttonKey 按钮key
 * @returns {{}|undefined}
 */
export function getMenuActionPermission(context, routeName, buttonKey) {
  const permissions = getMenuActionPermissions(context, routeName) || {}
  return permissions[buttonKey]
}

/**
 * 根据路由名称和按钮key获取权限判断是否有权限
 * @param context vue实例，即当前this
 * @param routeName 当前要判断的路由name，未指定取当前路由
 * @param buttonKey 按钮key
 * @returns {boolean}
 */
export function hasMenuActionPermission(context, routeName, buttonKey) {
  return !!getMenuActionPermission(context, routeName, buttonKey)
}

// 根据权限显示/隐藏或启用/禁用按钮等
function handleActionAuth(el, vnode, auth) {
  if (auth === 'visible') {
    if (el.style.display === 'none') {
      el.style.display = el.dataset.originalDisplay || ''
    }
  } else if (auth === 'invisible') {
    // 原始值存储起来
    if (el.dataset.originalDisplay !== undefined) {
      el.dataset.originalDisplay = el.style.display || ''
    }
    el.style.display = 'none'
  } else if (auth === 'disabled') {
    const instance = vnode.componentInstance
    if (instance) {
      instance.disabled = true
    } else {
      el.disabled = true
    }
  } else if (auth === 'enable') {
    const instance = vnode.componentInstance
    if (instance) {
      instance.disabled = false
    } else {
      el.disabled = false
    }
    if (el.style.display === 'none') {
      el.style.display = el.dataset.originalDisplay || ''
    }
  }
}

// 自定义菜单事件
function handleCustomAction(binding, vnode, el) {
  const expression = binding.value
  const auths = Array.isArray(expression) ? expression : []

  // 如果设置了路由，根据路由取权限
  const routeName = binding.arg || binding.instance.$route?.name
  const permissions = getMenuActionPermissions(binding.instance, routeName) || {}

  const check =
    !auths.length ||
    auths.filter((s) => {
      const { type } = permissions[s] || {}
      return !type || ['invisible', 'disabled'].includes(type)
    }).length === auths.length

  const auth = check ? 'invisible' : 'visible'

  handleActionAuth(el, vnode, auth)
}

export default function (app: App) {
  app.directive('has', function (el, binding, vnode) {
    // 操作按钮/权限
    const key = binding.arg
    if (!key) {
      console.error('v-has 未指定有效参数，如v-has:add')
      return
    }
    // 为空，按不可见
    const auth = getActionPermissionType(binding.instance, key)

    // 授权策略 visible:可见 invisible:不可见 enable:启用 disabled:禁用
    const types = ['visible', 'invisible', 'enable', 'disabled']
    if (!types.includes(auth)) {
      console.warn(`v-has  按钮/操作 ${key} 未配置有效的 type 属性，目前仅支持${types.join('/')}`)
    }
    handleActionAuth(el, vnode, auth)
  })

  /**
   * 按钮等操作权限，使用方式 v-action:按钮Key
   */
  app.directive('action', function (el, binding, vnode) {
    // 操作按钮/权限
    const key = binding.arg

    // 为空，按不可见
    const auth = getActionPermissionType(binding.instance, key)
    if (!key) {
      console.error('v-action 未指定有效参数，如v-action:add')
      return
    }

    // 授权策略 visible:可见 invisible:不可见 enable:启用 disabled:禁用
    const types = ['visible', 'invisible', 'enable', 'disabled']
    if (!types.includes(auth)) {
      console.warn(`按钮/操作 ${key} 未配置有效的 type 属性，目前仅支持${types.join('/')}`)
    }

    handleActionAuth(el, vnode, auth)
  })

  /**
   * 多操作权限或处理判断，使用方式 v-visible="[]" 或 v-visible:routeName="[]" 按钮Key
   */
  app.directive('visible', function (el, binding, vnode) {
    // 当表达式有值时，根据表达式的数组key，判断是否隐藏或禁用当前操作按钮/权限
    handleCustomAction(binding, vnode, el, false)
  })
}
