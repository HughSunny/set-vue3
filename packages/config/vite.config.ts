import { builtinModules } from 'node:module';
import path from 'node:path';
import { defineConfig, PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
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

const external = getExternal();

const resolve = (...paths: string[]) => {
  return path.resolve(__dirname, ...paths);
};

const plugins: PluginOption[] = [];
if (!process.env.VITE_DEBUG) {
  // @ts-ignore
  plugins.push(dts());
}

export default defineConfig({
  build: {
    minify: 'esbuild',
    reportCompressedSize: false,
    emptyOutDir: true,
    lib: {
      entry: resolve('src/index.ts'),
      name: 'xdcConfig',
      formats: ['cjs', 'es'],
      fileName: format => {
        return ['es'].includes(format) ? 'index.js' : `index.${format}.js`;
      },
    },
    rollupOptions: {
      external,
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
  },
  plugins: [dts()],
});
