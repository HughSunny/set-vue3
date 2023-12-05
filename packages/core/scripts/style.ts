import path from 'node:path';
import fs from 'fs-extra';
import glob from 'glob';

const srcPath = path.join(__dirname, '../src');
const destPath = path.join(__dirname, '../dist/src');

const files = glob.sync('**/*.less', {
  cwd: srcPath,
});
console.log(files);
files.forEach(s => {
  const fromPath = path.join(srcPath, s);
  console.log(fromPath);
  fs.copySync(path.join(srcPath, s), path.join(destPath, s), {
    overwrite: true,
  });
});
