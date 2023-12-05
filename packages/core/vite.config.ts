import path from 'node:path';
import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';

import pkg from './package.json';
const external: (string | RegExp)[] = Object.keys(pkg.dependencies);
const resolve = (...paths: string[]) => {
  return path.resolve(__dirname, ...paths);
};
// @ts-ignore
const plugins: PluginOption[] = [vue(), jsx(), DefineOptions()];
console.log('process.env.VITE_DEBUG', process.env.VITE_DEBUG);
if (!process.env.VITE_DEBUG) {
  plugins.push(dts());
}
export default defineConfig({
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'xdc-core',
      formats: ['cjs', 'es'],
      fileName: format => {
        return ['es'].includes(format) ? 'index.js' : `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: external.concat([/dayjs\/plugin/], /ant-design-vue\/lib/),
    },
    reportCompressedSize: false,
    emptyOutDir: false,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@core': path.join(__dirname, './src'),
      '~': path.join(__dirname, './src/assets'),
      '#': path.join(__dirname, './typings'),
      vue: 'vue/dist/vue.esm-bundler.js',
      dayjs: resolve(__dirname, 'node_modules', 'dayjs'),
      'ant-design-vue': resolve(__dirname, 'node_modules', 'ant-design-vue'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       // ANTD-PRO 初始化导入变量参数 不能少
  //       modifyVars: {
  //         hack: 'true; @import "./styles/variables.less";',
  //       },
  //       // DO NOT REMOVE THIS LINE
  //       javascriptEnabled: true,
  //     },
  //   },
  // },

  esbuild: {
    pure: ['console.log'],
    minifyIdentifiers: false,
  },
  plugins,
});

