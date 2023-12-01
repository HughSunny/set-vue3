import path from 'node:path';
import ejs from 'ejs';
import fs from 'fs-extra';
import _ from 'lodash';
import { logger, prettierFormat, getFolderNames } from '../../../scripts/utils';
const appPackage = require('../package.json');
const PACKAGE_PATH = path.join(__dirname, '../');
const srcComponentPath = 'src/components';

function getComponentModuleInPackage(packagePath, cpName) {
  const rootPath = './';
  const dirs = fs.readdirSync(`${srcComponentPath}/${packagePath}`);
  console.log('dirs', dirs);
  const name = nameToUpper(cpName);
  if (dirs.indexOf('index.ts') !== -1) {
    return {
      name: name,
      path: `${rootPath}${packagePath}`,
    };
  } else if (dirs.indexOf('index.vue') !== -1) {
    return {
      name: name,
      path: `${rootPath}${packagePath}/index.vue`,
    };
  }
  return null;
}
/**
 * 生成组件导出文件 src/components/index.ts
 * @param pkgName 包名
 */
async function genComponentsIndex() {
  const excludePackageDirs = ['set-form'];
  // const otherComponents = require('../src/components/other.json');
  const otherComponents = [];
  // components装的是组件
  let components = [];
  const componentDirList = fs.readdirSync(srcComponentPath, { withFileTypes: true });
  console.log('componentDirList', componentDirList);
  // 第一层目录
  componentDirList.map(componentsDir => {
    if (
      excludePackageDirs.indexOf(componentsDir.name) === -1 &&
      componentsDir.name.indexOf('.') === -1
    ) {
      const packageModule = getComponentModuleInPackage(
        `${componentsDir.name}`,
        componentsDir.name,
      );
      if (packageModule) {
        // 是目标组件的 文件夹,
        components.push(packageModule);
      } else {
        // 文件夹
        // 最多两层
        // 第二层目录文件夹
        let tempComponents = [];
        const secondDirs = fs.readdirSync(`${componentsDir.path}/${componentsDir.name}`, {
          withFileTypes: true,
        });

        secondDirs.forEach(dir => {
          if (dir.type === 2) {
            //文件夹
            const cpModule = getComponentModuleInPackage(
              `${componentsDir.name}/${dir.name}`,
              dir.name,
            );
            cpModule && tempComponents.push(cpModule);
          }
        });
        components.push(...tempComponents);
      }
    }
  });

  components.push(...otherComponents);
  console.log(components);
  const content = await ejs.renderFile(path.join(__dirname, './template/components_index.ts.ejs'), {
    components,
    _,
  });
  // ts

  const srcPath = path.join(PACKAGE_PATH, 'src/components');
  const destPath = path.join(srcPath, '/index.ts');
  fs.writeFileSync(destPath, prettierFormat(content, 'ts'));
  logger.success(`gen ${destPath}`);
  return components;
}

// let fileStrBuild = ''
// fs.outputFile(path.resolve(__dirname, '../src/mixui.build.ts'), fileStrBuild, 'utf8', error => {
//   // logger.success(`${package_config_path} 文件写入成功`);
// });
/**
 * 将文件名中的 - 去掉 变成 大驼峰
 * @param {*} filename
 * @returns
 */
function nameToUpper(filename) {
  let newFile = filename.slice(0, 1).toLocaleUpperCase() + filename.slice(1);
  while (newFile.indexOf('-') != -1) {
    let index = newFile.indexOf('-');
    newFile =
      newFile.slice(0, index) +
      newFile.slice(index + 1, index + 2).toLocaleUpperCase() +
      newFile.slice(index + 2);
  }
  console.log(newFile, filename);
  return newFile;
}

/**
 * 生成全局引用文件，用于组件提示
 */
async function genGlobalDts(components) {
  // const components = getFolderNames(path.join(PACKAGE_PATH, 'src/components'));
  const content = `// global.d.ts
declare module 'vue' {
  export interface GlobalComponents {
${components.map(s => `    ${s.name}: typeof import('@xdc/core')['${s.name}'];`).join('\n')}
  }
}

export {};
`;
  const destPath = path.join(PACKAGE_PATH, 'typings/global.d.ts');
  fs.writeFileSync(destPath, content);

  logger.success(`gen ${destPath}`);
}

async function run() {
  const components = await genComponentsIndex();
  await genGlobalDts(components);
}

run().then(() => {
  logger.success('gen code success');
});
