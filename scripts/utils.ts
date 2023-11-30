import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import prettier from 'prettier';

/**
 * 项目根路径
 */
export const ROOT_PATH = path.join(__dirname, '../');

/**
 * 项目根路径
 */
export const PACKAGES_PATH = path.join(ROOT_PATH, 'packages');

/**
 * 控制台输出日志
 */
export const logger = {
  /**
   * 提醒
   */
  info: (msg: string) => {
    console.log(`${chalk.blue('info')} ${msg}`);
  },
  /**
   * 警告
   */
  warn: (msg: string) => {
    console.log(`${chalk.yellow('warn')} ${msg}`);
  },
  /**
   * 错误
   */
  error: (msg: string) => {
    console.log(`${chalk.red('error')} ${msg}`);
  },
  /**
   * 成功
   */
  success: (msg: string) => {
    console.log(`${chalk.green('success')} ${msg}`);
  },
};

/**
 * 读取目录结构文件夹
 * @param folder
 */
export function getFolderNames(folder) {
  const files: string[] = [];
  if (!fs.existsSync(folder)) {
    logger.error(`${folder} 未找到组件目录`);
    return files;
  }

  const list = fs.readdirSync(folder, { withFileTypes: true });
  if (Array.isArray(list)) {
    list.forEach(item => {
      const { name } = item;
      if (item.isDirectory()) {
        files.push(name);
      }
    });
  }
  return files;
}

/**
 * 代码格式化
 * <a href="https://prettier.io/docs/en/options.html#parser">官方配置</a>
 */
export function prettierFormat(content: string, type: 'vue' | 'ts' | 'md' | 'less') {
  const prettierOptions =
    prettier.resolveConfig.sync(path.join(__dirname, '../.prettierrc.js')) || {};
  if (type === 'md') {
    prettierOptions.parser = 'markdown';
  } else {
    prettierOptions.parser = type === 'vue' ? 'vue' : 'babel-ts';
  }

  let parser: string = type;
  switch (type) {
    case 'ts':
      parser = 'babel-ts';
      break;
    case 'md':
      parser = 'markdown';
      break;
    default:
      break;
  }

  prettierOptions.parser = parser;

  prettierOptions.editorconfig = true;
  return prettier.format(content, prettierOptions);
}

/**
 * 获取所有模块名
 */
export function getPkgNames() {
  return fs.readdirSync(PACKAGES_PATH);
}

/**
 * 生成 style 的 index 文件
 * @param pkgPath 包目录
 * @param names 模块名
 * @param options 可选项
 */
export async function genModuleStyle(
  pkgPath,
  names: string[],
  options?: { mergeName?: string; inject?: string; injectEnd?: string },
) {
  let { mergeName } = options || {};
  const SRC_PATH = path.join(pkgPath, 'src');
  if (!mergeName) {
    mergeName = 'index';
  }

  const readLess = (name: string): string[] => {
    const styleFiles: string[] = [];
    const readLessFiles = folder => {
      const rs = fs.readdirSync(path.join(SRC_PATH, folder), { withFileTypes: true });
      if (Array.isArray(rs)) {
        rs.forEach(r => {
          const fileName = r.name;
          const newPath = `${folder}/${fileName}`;
          if (r.isFile()) {
            if (fileName.endsWith('.less')) {
              styleFiles.push(newPath);
            }
          } else if (r.isDirectory()) {
            readLessFiles(newPath);
          }
        });
      }
    };

    readLessFiles(name);

    if (styleFiles.length === 0) {
      return [];
    }

    return [`// ${name} style`].concat(
      styleFiles.map(s => `@import '${s}';`),
      [''],
    );
  };

  const writeFile = (name, contents) => {
    const destPath = path.join(SRC_PATH, `${name}.less`);
    fs.writeFileSync(destPath, prettierFormat(contents.join('\n'), 'less'));
    logger.success(`gen ${destPath}`);
  };

  // 合并文件内容
  let mergeContents: string[] = [];
  const { inject, injectEnd } = options || {};
  if (inject) {
    mergeContents.push(inject);
    mergeContents.push('');
  }

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const distPath = path.join(SRC_PATH, name);
    if (!fs.existsSync(distPath)) {
      logger.warn(`${distPath} not exist`);
      continue;
    }

    const contents: string[] = readLess(name);

    if (mergeName) {
      mergeContents = [...mergeContents, ...contents];
    } else {
      writeFile(name, contents);
    }
  }
  // 文件合并
  if (mergeName) {
    mergeContents.push(`// styles style
@import 'styles/index.less';
`);

    if (injectEnd) {
      mergeContents.push(injectEnd);
      mergeContents.push('');
    }

    writeFile(mergeName, mergeContents);
  }
}
