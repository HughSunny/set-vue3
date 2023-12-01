import antd from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs/locale/zh-cn'

// antd dayjs 也需要中文化
const locales = {
  localeName: 'zhCN',
  X: 'zh-cn',
  antd,
  dayjs,

  // 其他相关中文语言
  测试数据: '测试数据',
  // '事件': 'event',
  // '属性': 'property',
  // '动画': 'animation',
  // '自定义': 'custom'
  'constants.name': '姓名',
  'constant.jobName': '任务名称',

  // sys下面的必须翻译转化
  sys: {
    constant: {
      numberValue: '数字值',
      lengthNotMoreThan: '长度不能超过',
      totalCount: '共{total}条记录',
      saveSuccess: '保存成功'
    },
    route: {
      reloadCurrentPage: '刷新当前页',
      closeOthers: '关闭其他',
      closeLeft: '关闭到左侧',
      closeRight: '关闭到右侧'
    },
    action: {
      query: '查询',
      add: '添加',
      newAdd: '新增',
      new: '新建',
      edit: '编辑',
      modify: '修改',
      delete: '删除',
      save: '保存',
      submit: '提交',
      reset: '重置',
      permission: '权限',
      pleaseInput: '请输入{label}',
      pleaseSelect: '请选择{label}',
      pleaseUpload: '请上传{label}',
      ok: '确定',
      cancel: '取消',

      log: '日志',
      execute: '执行',
      manualExecution: '手动执行',
      login: '登录',
      logout: '退出登录',

      confirmDeleteThis: '确认删除该',
      canInputKeywordSearch: '可输入关键词搜索'
    },
    user: {
      account: '账号',
      password: '密码',
      language: '语言',
      rememberMe: '记住我',
      rememberPassword: '记住密码',
      changePassword: '修改密码',
      resetPassword: '重置密码',
      resetPasswordSuccess: '重置密码成功',
      newPassword: '新密码',
      oldPassword: '原密码',
      confirmPassword: '确认密码',
      passwordNotSame: '与新密码不同,请检查'
    },
    menu: {
      // '系统管理': '系统管理',
      // '用户管理': '用户管理',
      // '角色管理': '角色管理',
    },
    status: {
      healthy: '健康',
      enable: '启用',
      disable: '禁用',
      success: '成功',
      failed: '失败',
      warning: '警告',
      error: '错误',
      info: '提示',
      default: '默认',
      notNull: '不能为空',
      yes: '是',
      no: '否',
      exception: '异常'
    },
    module: {
      user: '用户',
      menu: '菜单',
      role: '角色',
      menuPermission: '菜单权限'
    },
    api: {
      operationFailed: '操作失败',
      errorTip: '错误提示',
      errorMessage: '操作失败,系统异常!',
      timeoutMessage: '登录超时,请重新登录!',
      apiTimeoutMessage: '接口请求超时,请刷新页面重试!',
      apiRequestFailed: '请求出错，请稍候重试',
      networkException: '网络异常',
      networkExceptionMsg: '网络异常，请检查您的网络连接是否正常!',

      errMsg401: '用户没有权限（令牌、用户名、密码错误）!',
      errMsg403: '用户得到授权，但是访问是被禁止的。!',
      errMsg404: '网络请求错误,未找到该资源!',
      errMsg405: '网络请求错误,请求方法未允许!',
      errMsg408: '网络请求超时!',
      errMsg500: '服务器错误,请联系管理员!',
      errMsg501: '网络未实现!',
      errMsg502: '网络错误!',
      errMsg503: '服务不可用，服务器暂时过载或维护!',
      errMsg504: '网络超时!',
      errMsg505: 'http版本不支持该请求!'
    }
  }
}
export default {
  ...locales,
};
