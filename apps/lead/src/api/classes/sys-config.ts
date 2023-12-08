/**
 * 系统配置类
 */
export interface ISysConfig {
  /**登录页标题 */
  LoginSysName: string;
  /**登录页显示的logo */
  LoginSysLogo: string;
  /**首页显示的logo */
  SysLogo: string;
  /**首页头的背景图片 */
  HeaderImage: string;
  SysName: string;
  AnnounceDelay: number;
  TraceType: number;
  FriendUrls: LinkUrl[];
  MessageSendTypes: string[];
}
export class SysConfig {
  /**登录页标题 */
  LoginSysName: string;
  /**登录页显示的logo */
  LoginSysLogo: string;
  /**首页显示的logo */
  SysLogo: string;
  /**首页头的背景图片 */
  HeaderImage: string;
  SysName: string;
  AnnounceDelay: number;
  TraceType: number;
  FriendUrls: LinkUrl[];
  MessageSendTypes: string[];

  constructor() {
    this.SysName = 'ACE MOM';
    this.AnnounceDelay = 7;
    this.FriendUrls = [];
    this.MessageSendTypes = [];
  }
}

/**
 * 友情链接类
 */
export class LinkUrl {
  Caption: string;
  Url: string;

  constructor() {}
}

export class LeadAppConfig {
  AppName: string;
  AppUrl: string;
  PublishAddress: string;
  PublishName: string;
  PublishPassword: string;

  constructor() {
    this.AppUrl = 'http://127.0.0.1:8088';
    this.PublishAddress = 'ftp://127.0.0.1:8089';
    this.PublishName = 'FtpUser';
  }
}

/**
 * 文件存储类
 */
export class FTPFileStoreConfig {
  StoreServerType: number;
  MaxSize: number;
  Address: string;
  UserName: string;
  Password: string;
  RootDirectory: string;

  constructor() {
    this.StoreServerType = 0;
    this.MaxSize = 20;
  }
}

/**
 * 看板配置类
 */
export class KanbanConfig {
  Host: string; // 看板服务器地址
  Path: string; // 看板路径

  constructor() {
    this.Host = '127.0.0.1';
    this.Path = '';
  }
}

/**
 * 邮件发送配置类
 */
export class MailConfig {
  Host: string; // SMTP 地址
  Port: number; // SMTP 端口号
  SendAddress: string; // 发送邮箱账号
  AuthorizationCode: string; // 客户端授权码
  EnableSsl: boolean; // 允许SSL

  constructor() {
    this.Host = '127.0.0.1';
    this.Port = 25;
    this.EnableSsl = false;
  }
}

/**
 * 腕表信息发送配置类
 */
export class WatchConfig {
  IpString: string; // 发送器IP
  Port: number; // 发送器端口号
  BaudRate: number; // 发送速率
  Polarity: number; // 信号极性
  Tone: number; // 音频
  Pager: number; // 信息类型
  IsChinese: boolean; // 支持中文

  constructor() {
    this.IpString = '127.0.0.1';
    this.Port = 9666;
    this.BaudRate = 1;
    this.Polarity = 0;
    this.Tone = 0;
    this.Pager = 1;
    this.IsChinese = false;
  }
}

/**
 * 阿里云短信发送配置类
 */
export class AliyunConfig {
  RegionId: string; // 区域ID
  AccessKeyId: string; // 产品ID
  Secret: string; // 密钥
  EndpointName: string; // 终结点名称
  Product: string; // 产品名称
  Domain: string; // 产品域名
  UpperLimit: number; // 批量发送上限
  SignName: string; // 短信签名
  TemplateCode: string; // 短信模板

  constructor() {
    this.RegionId = 'cn-hangzhou';
    this.EndpointName = 'cn-hangzhou';
    this.UpperLimit = 1000;
    this.Product = 'Dysmsapi';
    this.Domain = 'dysmsapi.aliyuncs.com';
  }
}
/** 钉钉配置 */
export class DingTalkConfig {
  /** 钉钉api服务地址 */
  ApiUrl = '';
  /**应用的agentid */
  AgentId = '';
  /**已创建的企业内部应用的AppKey */
  AppKey = '';
  /**已创建的企业内部应用的AppSecret */
  AppSecret = '';
}
/**微信应用配置信息 */
export class WeiXinConfig {
  ApiUrl = '';
  /**应用的agentid */
  AgentId = '';
  Corpid = '';
  Corpsecret = '';
}
