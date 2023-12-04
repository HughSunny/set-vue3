# xdc/core


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## 代码结构

├─environment           -文件夹-工程环境变量
├─public                -文件夹-静态资源，编译打包时,直接复制到目标目录
├─src                   -文件夹-源代码
│  ├─api                -文件夹-API服务接口
│  ├─assets             -文件夹-资源文件(包括图片、字体、样式等)
│  ├─components         -文件夹-公用封装组件 
│  ├─entity             -文件夹-公用实体类
│  ├─interface          -文件夹-公用定义接口，参照ts-interface
│  ├─directives         -文件夹-vue 指令
│  ├─hooks              -文件夹-组件级别的钩子函数， 利用vue directive特性
│  ├─home               -文件夹-主页布局
│  ├─router             -文件夹-页面路由
│  ├─store              -文件夹-Vue 状态管理
│  ├─views              -文件夹-页面实现
│  ├─utils              -文件夹-工具方法
│  ├─App.vue            -页面主文件,main.ts中mount它
│  └─main.ts            -程序主文件，初始化操作
├─typings               -文件夹-申明全局类型  types->typing 比较好搜索
├─index.html            -站点主入口html
├─vite.config.ts        -VITE-打包编译文件
├─tsconfig.json         -TS-编译配置文件 
└─package.json          -配置/包管理文件

