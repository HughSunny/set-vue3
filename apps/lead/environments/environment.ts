export default {
  version: '3.1.0',
  sysName: '工业平台产品',
  production: false,

  appCode: 'lead-mes',

  // lang: 'zh',
  mqttUrl: '',
  enableOdic: false,
  enableInternational: true,

  sysType: 'INDUSTRY', // MDM or MES or INDUSTRY
  // 工业平台
  baseUrl: 'http://10.30.121.131:5000',
  i18nServiceUrl: '/Assets/I18n',
  lang: 'zh-CN',
  uploadStorePath: 'File',
  // MES
  // baseUrl: 'http://ext.leadchina.cn/mes/Service',
  // i18nServiceUrl: '/CommonService/GetLanguageResources',
  // lang: 'zh',
  approvalServiceUrl: 'ApprovalService',
  commonServiceUrl: 'CommonService',
  messageServiceUrl: 'MessageService',
  ucServiceUrl: 'UCService',
  fileServiceUrl: 'FileManageService',
  sysConfigServiceUrl: 'SysConfigService',
  bdServiceUrl: 'BDService',
  mmServiceUrl: 'MMService',
  pmServiceUrl: 'PMService',
  peServiceUrl: 'PEService',
  emServiceUrl: 'EMService',
  qmServiceUrl: 'QMService',
  saServiceUrl: 'SAService',
  ecServiceUrl: 'ECService',
  pxServiceUrl: 'PXService',
  kbServiceUrl: 'KBService',
  itServiceUrl: 'ITService',
  rptServiceUrl: 'RPTService',
  reportService: 'ReportService',
  oauthServiceUrl: 'AuthService',
  apiServiceUrl: 'ApiService'
}
