import type { ErrorMessageMode } from '#/axios'
import { useMessage } from '@core/hooks/useMessage'
import { useI18n } from '@core/hooks/useI18n'
import { useUserStore } from '@core/store/user'
import { SessionTimeoutProcessingEnum } from '@core/enum/httpEnum'

const { createMessage, createErrorModal } = useMessage()
const error = createMessage.error!
// const stp = projectSetting.sessionTimeoutProcessing;
// 可以设置，可以登出
const stp = SessionTimeoutProcessingEnum.PAGE_COVERAGE

/**
 *
 * @param status response status code
 * @param msg  the error message of response
 * @param errorMessageMode
 */
export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  const { t } = useI18n()
  const userStore = useUserStore()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = msg || t('sys.api.errMsg401')
      userStore.logoutAndJump(false)
      // userStore.setToken(undefined);
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true)
      // } else {
      //   userStore.logoutAndJump(false)
      // }
      break
    case 403:
      errMessage = t('sys.api.errMsg403')
      userStore.logoutAndJump(false)
      break
    // 404请求不存在
    case 404:
      errMessage = t('sys.api.errMsg404')
      break
    case 405:
      errMessage = t('sys.api.errMsg405')
      break
    case 408:
      errMessage = t('sys.api.errMsg408')
      break
    case 500:
      errMessage = msg || t('sys.api.errMsg500')
      break
    case 501:
      errMessage = t('sys.api.errMsg501')
      break
    case 502:
      errMessage = t('sys.api.errMsg502')
      break
    case 503:
      errMessage = t('sys.api.errMsg503')
      break
    case 504:
      errMessage = t('sys.api.errMsg504')
      break
    case 505:
      errMessage = t('sys.api.errMsg505')
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` })
    }
  }
}
