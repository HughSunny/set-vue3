// mes OAuth2Option配置
export interface IOAuth2Option {
  /**
   * 认证服务器登录Url
   */
  AuthenticationLoginUrl: string;
  /**
   * 是否使用第三方认证服务
   */
  IsUseThirdAuthServer: boolean;
  /**
   * 认证服务器URL
   */
  AuthenticationUrl: string;
  /**
   * 是否开启单点登录
   */
  EnableSSO: boolean;
  /**
   * 是否认证服务器
   */
  IsAuthenticationServer: boolean;

  /**
   * 认证URI
   */
  AuthorizationEndpointUris: string[];

  /**
   * LogoutURI
   */
  LogoutEndpointUris: string[];

  /**
   * 获取Token URI
   */
  TokenEndpointUris: string[];

  /**
   * 获取用户信息URI
   */
  UserinfoEndpointUris: string[];

  /**
   * Configuration URI
   */
  ConfigurationEndpointUris: string[];

  /**
   * Cryptography URI
   */
  CryptographyEndpointUris: string[];

  /**
   * 客户端重定向URI
   */
  ClientRedirectUri: string;

  /**
   * 客户端ID
   */
  ClientId: string;

  /**
   * 第三方认证服务器地址
   */
  ThirdAuthenticationUrl: string;

  /**
   * 第三方配置Url
   */
  ThirdConfigurationEndpointUri: string;

  /**
   * 第三方Token Url
   */
  ThirdTokenEndpointUri: string;

  /**
   * 第三方userinfo Url
   */
  ThirdUserinfoEndpointUri: string;

  /**
   * 是否使用第三方工作流
   */
  UseThirdWorkflow: boolean;
}

const defaultOAuth2Option = {
  AuthenticationLoginUrl: '',
  AuthenticationUrl: '',
  EnableSSO: false,
  IsAuthenticationServer: false,
  AuthorizationEndpointUris: [],
  LogoutEndpointUris: [],
  TokenEndpointUris: [],
  UserinfoEndpointUris: [],
  ConfigurationEndpointUris: [],
  CryptographyEndpointUris: [],
  ClientRedirectUri: '',
  ClientId: '',
  IsUseThirdAuthServer: false,
  ThirdAuthenticationUrl: '',
  ThirdConfigurationEndpointUri: '',
  ThirdTokenEndpointUri: '',
  ThirdUserinfoEndpointUri: '',
  UseThirdWorkflow: false,
};
