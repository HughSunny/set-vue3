/// <reference types="./src/env.d.ts" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import UnoCss from 'unocss/vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import env from './environments/environment';
import envProd from './environments/environment.prod';

export default defineConfig(({ command, mode }) => {
  console.log(mode);
  return {
    envDir: 'env',
    envPrefix: '_',
    server: {
      port: 4600,
    },
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11', 'Chrome 63', 'Firefox > 20'],
        modernPolyfills: true,
      }),
      vue(),
      vueJsx(),
      UnoCss(),
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/en_US',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/form',
        'dayjs',
        'dayjs/locale/en',
        'dayjs/locale/zh-cn',
        '@ant-design/icons-vue',
        'lodash-es',
        'pinia',
        'vue-router',
        'vue',
        'vue-i18n',
        '@vueuse/core',
      ],
    },
    define: {
      _APP_CONFIG_: mode === 'production' ? JSON.stringify(envProd) : JSON.stringify(env),
    },
  };
});
