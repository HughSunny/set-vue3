const package = require('../package.json');
// const config = require('../src/config.json');
const config = require('../src/components/other.json');
const path = require('path');
const fs = require('fs-extra');
let importStr = `import { App } from 'vue';\nimport 'virtual:windi.css';\nimport 'virtual:svg-icons-register';\nimport './styles/style.css';\n`;
// importStr += `export * from './components/set-form/set-form-helper';\n`;
let importScssStr = `\n`;
const packages = [];

const componentsDirs = ['set-upload'];
// components装的是
let components = [];
// 第一层目录
componentsDirs.map(componentsDir => {
  let dirs = fs.readdirSync(`./src/components/${componentsDir}`);
  let tempComponents = [];
  dirs.map(fileOrDir => {
    if (fileOrDir === 'index.vue') {
      // 名字是 componentsDir 变成大驼峰
      const name = nameToUpper(componentsDir);
      components.push({
        name: name,
        path: `./components/${componentsDir}`,
      });
      // packages.push(name);
    } else if (fileOrDir.indexOf('.') === -1) {
      // 最多两层
      tempComponents.push({
        name: dir,
        path: `./components/${componentsDir}/${dir}`,
      });
    }

  });
  components = [...components, ...tempComponents];
});



components.map(component => {
  importStr += `import ${component.name} from '${component.path}/index${'.vue'}';\n`;
  importScssStr += `import '${component.path}/index.scss';\n`;
  packages.push(component.name);
});

config.map(component => {
  importStr += `import ${component.name} from '${component.path}';\n`;
  // importScssStr += `import '${component.path}/index.scss';\n`;
  packages.push(component.name);
});

let installFunction = `function install(app: App) {
  const packages = [${packages.join(',')}];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);p
    }
  });
}`;

let fileStrBuild = `${importStr}
${installFunction}
const version = '${package.version}';
export { install, version, ${packages.join(',')}};
export default { install, version};`;

fs.outputFile(path.resolve(__dirname, '../src/mixui.build.ts'), fileStrBuild, 'utf8', error => {
  // logger.success(`${package_config_path} 文件写入成功`);
});
/**
 * 将文件名中的 - 去掉 变成 大驼峰
 * @param {*} filename
 * @returns
 */
function nameToUpper(filename) {
  let newFile = filename.slice(0, 1).toLocaleUpperCase() +  filename.slice(1);
  while (newFile.indexOf('-') != -1) {
    let index = newFile.indexOf('-');
    newFile =
      newFile.slice(0, index) + newFile.slice(index + 1, index + 2).toLocaleUpperCase() + newFile.slice(index + 2);
  }
  console.log(newFile, filename);
  return newFile;
}
