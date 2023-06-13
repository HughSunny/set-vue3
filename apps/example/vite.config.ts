import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vitePluginImp from 'vite-plugin-imp';
import styleImport from 'vite-plugin-style-import';

import viteSvgIcons from 'vite-plugin-svg-icons';
import WindiCSS from 'vite-plugin-windicss';

import svgLoader from 'vite-svg-loader';
// import config from './package.json';

import path from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

import type { Plugin } from 'vite';

/**
 * TODO
 * Temporarily solve the Vite circular dependency problem, and wait for a better solution to fix it later. I don't know what problems this writing will bring.
 * @returns
 */

export function configHmrPlugin(): Plugin {
  return {
    name: 'singleHMR',
    handleHotUpdate({ modules, file }) {
      if (file.match(/xml$/)) return [];

      modules.forEach(m => {
        if (!m.url.match(/\.(css|less)/)) {
          m.importedModules = new Set();
          m.importers = new Set();
        }
      });

      return modules;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('custom-component-')
        }
      }
    }),
    vueJsx(),
    legacy(),
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
      // libs: [
      //   {
      //     libraryName: 'ant-design-vue',
      //     esModule: true,
      //     resolveStyle: name => {
      //       console.log('name--------',name)
      //       return `ant-design-vue/es/${name}/style/index`;
      //     }
      //   }
      // ]
    })
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
      // {
      //   find: /\/@\//,
      //   replacement: pathResolve('src') + '/'
      // },
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
  ssgOptions: {
    // format: 'cjs',
    dirStyle: 'nested'
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
      // external: [...Object.keys(config.dependencies).filter(x => x.indexOf('@mix') == -1), ...Object.keys(config.devDependencies)],
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...(!process.env.VITE_SSG
          ? {
              'silent-renew-oidc': resolve(__dirname, 'silent-renew-oidc.html')
            }
          : {})
        // 'silent-renew-oidc': resolve(__dirname, 'silent-renew-oidc.html'),
      },
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //     }
      //   },
      // },
      ...(process.env.VITE_SSG ? { treeshake: false } : {}),
      output: {
        ...(process.env.VITE_SSG
          ? {
              footer: 'export { createApp,includedRoutes }'
              // footer: 'export { createApp }',
              // footer: 'exports.createApp = createApp;exports.includedRoutes = includedRoutes;',
            }
          : {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
              }
            })
        // globals: {
        //   vue: 'Vue',
        //   vuex: 'vuex'
        // },
      }
    }
  }
});
