import http from '@/api/http'
enum Api {
  entity = '/api/permission'
}

export async function login(account: string, password: string) {
  return http.post(
    { url: [Api.entity, 'basicLogin'].join('/'), data: { account, password } },
    {
      isReturnNativeResponse: true, // 是否返回本地响应头,需要获取响应头时使用此属性
      withToken: false
    }
  )
}
