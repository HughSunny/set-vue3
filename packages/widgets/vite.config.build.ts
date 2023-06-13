import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vitePluginImp from 'vite-plugin-imp';
import styleImport from 'vite-plugin-style-import';
import commonjs from 'rollup-plugin-commonjs';

import viteSvgIcons from 'vite-plugin-svg-icons';
import WindiCSS from 'vite-plugin-windicss';
import svgLoader from 'vite-svg-loader';

import config from './package.json';

import path from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

import type { Plugin } from 'vite';

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @mix.
* Released under the MIT License.
*/`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS({
      safelist: 'no-select',
      preflight: {
        enableAll: true
      }
    }),
    svgLoader(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'ant-design-vue',
    //       style(name) {
    //         return `ant-design-vue/es/${name}/style/index.less`;
    //       },
    //     },
    //   ],
    // }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: name => {
            return `ant-design-vue/es/${name}/style/index`;
          }
        }
      ]
    }),
    commonjs()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
      // ['@vue/compiler-sfc', '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'],
    ]
  },
  server: {
    port: 3011
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: [...Object.keys(config.dependencies), ...Object.keys(config.devDependencies)],
      output: {
        banner,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: 'src/mixui.build.ts',
      name: 'set-widgets',
      fileName: 'set-widgets',
      formats: ['es', 'cjs', 'umd']
    }
  }
});
