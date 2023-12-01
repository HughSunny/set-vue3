import antd from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs/locale/en'

// antd dayjs 英文配置
const locales = {
  localeName: 'enUS',
  dayjsLocaleName: 'en',
  antd,
  dayjs,
  测试数据: 'test data',
  // '事件': 'event',
  // '属性': 'property',
  // '动画': 'animation',
  // '自定义': 'custom'

  'constants.name': 'Name',
  姓名: 'Name1',
  账号: 'Account',
  系统管理: 'System Management',
  用户管理: 'System User ',
  角色管理: 'Role',

  sys: {
    //英文操作后需要加空格
    action: {
      query: 'Query ',
      add: 'Add ',
      newAdd: 'Add ',
      new: 'New ',
      edit: 'Edit ',
      modify: 'Modify ',
      delete: 'Delete ',
      save: 'Save ',
      submit: 'Submit ',
      reset: 'Reset ',
      permission: 'Permission ',
      pleaseInput: 'Please Input {label}',
      pleaseSelect: 'Please Select {label}',
      pleaseUpload: 'Please Upload {label}'
    },
    login: {
      account: 'Account',
      password: 'Password',
      language: 'Language',
      rememberMe: 'Remember me'
    },
    menu: {},
    status: {
      healthy: 'healthy',
      enable: 'enable',
      disable: 'disable',
      success: 'success',
      failed: 'failed',
      warning: 'warning',
      error: 'error',
      info: 'info',
      default: 'default',
      notNull: 'notNull',
      yes: 'yes',
      no: 'no',
      exception: 'exception'
    },
    module: {
      user: 'user',
      menu: 'menu',
      role: 'role',
      menuPermission: 'menu permission'
    },
    api: {
      operationFailed: 'Operation failed',
      errorTip: 'Error Tip',
      errorMessage: 'The operation failed, the system is abnormal!',
      timeoutMessage: 'Login timed out, please log in again!',
      apiTimeoutMessage: 'The interface request timed out, please refresh the page and try again!',
      apiRequestFailed: 'The interface request failed, please try again later!',
      networkException: 'network anomaly',
      networkExceptionMsg:
        'Please check if your network connection is normal! The network is abnormal',
      errMsg401: 'The user does not have permission (token, user name, password error)!',
      errMsg403: 'The user is authorized, but access is forbidden!',
      errMsg404: 'Network request error, the resource was not found!',
      errMsg405: 'Network request error, request method not allowed!',
      errMsg408: 'Network request timed out!',
      errMsg500: 'Server error, please contact the administrator!',
      errMsg501: 'The network is not implemented!',
      errMsg502: 'Network Error!',
      errMsg503: 'The service is unavailable, the server is temporarily overloaded or maintained!',
      errMsg504: 'Network timeout!',
      errMsg505: 'The http version does not support the request!'
    }
  }
}
export default {
  ...locales
}
