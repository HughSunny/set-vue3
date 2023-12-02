import { builtinModules } from 'node:module';
import path from 'node:path';
import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';

import pkg from './package.json';

const getExternal = () => {
  const modules = builtinModules.filter(
    x => !/^_|^(internal|v8|node-inspect|fsevents)\/|\//.test(x),
  );

  return modules
    .concat(modules.map(s => `node:${s}`))
    .concat(Object.keys(pkg.dependencies))
    .concat(Object.keys(pkg.devDependencies));
};

// const external = getExternal();
const external: (string | RegExp)[] = Object.keys(pkg.dependencies);
const resolve = (...paths: string[]) => {
  return path.resolve(__dirname, ...paths);
};
// @ts-ignore
const plugins: PluginOption[] = [vue(), jsx(), DefineOptions()];
if (!process.env.VITE_DEBUG) {
  plugins.push(dts());
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'xdc-widgets',
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
      '@': path.join(__dirname, './src'),
      '~': path.join(__dirname, './src/assets'),
    },
  },

  esbuild: {
    pure: ['console.log'],
    minifyIdentifiers: false,
  },
  plugins,
});
