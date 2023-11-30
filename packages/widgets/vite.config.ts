import path from 'node:path';
import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import pkg from './package.json';

const external: (string | RegExp)[] = Object.keys(pkg.dependencies);
const resolve = (...paths: string[]) => {
  return path.resolve(__dirname, ...paths);
};
// @ts-ignore
const plugins: PluginOption[] = [vue(), jsx()];
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
  esbuild: {
    pure: ['console.log'],
    minifyIdentifiers: false,
  },
  plugins,
});
