# XDC config

为 XDC 项目提供 eslint、prettier、stylelint、commitlint、tsconfig 通用配置

## 编码规范

### eslint

[ESlint](https://eslint.bootcss.com/) 是一个 JavaScript 语法规则和代码风格

#### install

```bash
pnpm add eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser eslint-config-prettier
pnpm add eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-vue
```

- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io)：使 eslint 和 prettier 支持 TypeScript 的工具
- [@typescript-eslint/parser](https://typescript-eslint.io/architecture/parser)：一个 eslint 解析器，用于将 TypeScript 代码解析为 eslint 兼容的节点，以及提供支持 TypeScript 程序
- [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)：解析自定义 `.vue` 文件
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)：兼容 prettier 规则
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)：关闭所有不必要的或可能与 `Prettier` 冲突的规则
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)：这个插件旨在支持 ES2015+（ES6+）导入/导出语法的提示，并防止文件路径和导入名称拼写错误的问题
- [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)：增加对 `eslint-plugin-import` 的 TypeScript 支持
- [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)：import 规则
- [eslint-plugin-vue](https://eslint.vuejs.org)：vue.js 的官方 eslint 插件

#### config

```
.eslintignore
.eslintrc.js
```

### prettier

[Prettier](https://prettier.io/) 是一个代码格式化工具

#### install

```bash
pnpm add prettier
```

#### config

```
.prettierignore
.prettierrc.js
```

### postcss

[PostCSS](https://www.postcss.com.cn/) 是一个用 JavaScript 工具和插件转换 CSS 代码的工具

#### install

```bash
pnpm add postcss postcss-html postcss-less
```

### stylelint

[stylelint](https://stylelint.docschina.org/) 是一个样式规范工具

#### install

```bash
pnpm add stylelint stylelint-config-standard stylelint-config-recommended-vue stylelint-prettier stylelint-config-html
pnpm add stylelint-order stylelint-config-property-sort-order-smacss
```

- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)：stylelint 的标准可共享配置
- [stylelint-config-recommended-vue](https://www.npmjs.com/package/stylelint-config-html)：vue 规则
- [stylelint-prettier](https://www.npmjs.com/package/stylelint-prettier)：将 Prettier 作为 stylelint 规则运行，并将差异报告为单个 stylelint 问题
- [stylelint-config-html](https://www.npmjs.com/package/stylelint-config-html)：stylelint 的可共享 HTML（和类似 HTML）配置
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)：为 stylelint 提供的与排序相关的提示规则的插件包
- [stylelint-config-property-sort-order-smacss](https://www.npmjs.com/package/stylelint-config-property-sort-order-smacss)：基于 [SMACSS](http://smacss.com/) 方法的属性排序

### tsconfig

参考 [@vue/tsconfig](https://www.npmjs.com/package/@vue/tsconfig) 和 [@tsconfig/node18](https://www.npmjs.com/package/@tsconfig/node18)
