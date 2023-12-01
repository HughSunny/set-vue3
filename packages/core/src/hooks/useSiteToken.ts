import { TinyColor } from '@ctrl/tinycolor'
import { theme } from 'ant-design-vue'
import { computed, watch } from 'vue'
import { useAppStore } from '@core/store/app'
const { useToken } = theme

const useSiteToken = () => {
  const result = useToken()
  const { token } = result
  const appStore = useAppStore()
  const frameDarkBackground = computed(() => appStore.frameDarkBackground)
  const frameMenuSubBg = computed(() => appStore.frameMenuSubBg)
  const mergedToken = computed(() => ({
    theme: result.theme.value,
    hashId: result.hashId.value,
    token: {
      ...token.value
    }
  }))

  let styleDom: HTMLStyleElement | null = null
  watch(
    mergedToken,
    () => {
      styleDom = styleDom || document.createElement('style')
      const tokenValue = mergedToken.value.token
      // layout-sider-background 菜单底色  #001529 -> #1F2B69
      const menuColor = frameDarkBackground.value
      const menuSubColor = frameMenuSubBg.value //  #001529 -> #2b3775

      styleDom.innerHTML = `
      :root {
        --font-size-base: ${tokenValue.fontSize}px;

        --screen-xl: ${tokenValue.screenXL}px;
        --screen-lg: ${tokenValue.screenLG}px;
        --screen-md: ${tokenValue.screenMD}px;
        --screen-sm: ${tokenValue.screenSM}px;
        --screen-xs: ${tokenValue.screenXS}px;

        --component-background: ${tokenValue.colorBgContainer};
        --background-color-light: ${tokenValue.colorBgContainer};
        --popover-bg: ${tokenValue.colorBgContainer};

        --primary-color: ${tokenValue.colorPrimary};
        --primary-1: ${tokenValue['primary-1']};
        --primary-6: ${tokenValue['primary-6']};

        --text-color: ${tokenValue.colorText};
        --text-color-secondary: ${tokenValue.colorTextSecondary};
        --text-color-inverse: ${tokenValue.colorWhite};
        --heading-color: ${tokenValue.colorTextHeading};
        --disabled-color: ${tokenValue.colorTextDisabled};

        --btn-primary-color: #fff;

        --heading-3-size: ${tokenValue.fontSizeHeading3}px;
        --red-6: ${tokenValue['red-6']};
        --tag-default-bg: hsv(0, 0, 98%);
        --green-6: ${tokenValue['green-6']};
        --background-color-base: ${tokenValue.colorBgBase};
        --font-size-lg: ${tokenValue.fontSizeLG}px;
        --highlight-color: ${tokenValue.colorHighlight};
        --avatar-size-base: 32px;
        --avatar-size-lg: 40px;
        --avatar-size-sm: 24px;

        --shadow-color: ${tokenValue.colorFillContentHover};

        --border-color-base: ${tokenValue.colorBorder};
        --border-color-split: ${tokenValue.colorSplit};
        --border-width-base: ${tokenValue.lineWidth};
        --border-style-base: solid;
        --border-radius-base: ${tokenValue.borderRadius};

        --layout-sider-background: ${menuColor};
        --menu-dark-bg:  ${menuColor};
        --menu-dark-sub-bg:  ${menuSubColor};
        --menu-dark-bg-85: ${new TinyColor(menuColor).setAlpha(0.85).toHex8String()};
        --menu-dark-bg-65: ${new TinyColor(menuColor).setAlpha(0.65).toHex8String()};

        --ease-in-out: ${tokenValue.motionEaseInOut};
      }
    `
      if (styleDom && !document.body.contains(styleDom)) {
        document.body.appendChild(styleDom)
      }
    },
    { immediate: true }
  )

  return mergedToken
}

export default useSiteToken
