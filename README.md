# xdc-vue3

## Project Setup

```sh
pnpm i
```

## 注意事项
1.应用层app 代码结构中的index.html,body标签要添加id属性为"app-body"



## 工程结构
├─apps                  -文件夹-应用层app
│  ├─lead               -文件夹-lead应用
│  ├─app1               -文件夹-app1应用
│  └─...                -可以添加其他应用
├─packages              -文件夹-封装库集合
│  ├─config             -文件夹-配置封装      -@xdc/config
│  ├─core               -文件夹-框架业务封装  -@xdc/core
│  ├─mes                -文件夹-mes业务路由   -@xdc/mes
│  ├─utils              -文件夹-工具方法封装  -@xdc/utils
│  ├─widgets            -文件夹-公共组件封装  -@xdc/widgets
│  └─...                -可以添加其他封装库
├─scripts               -文件夹-脚本封装
├─pnpm-workspace.yaml   -pnpm的workspace配置
├─tsconfig.json         -TS-配置文件
└─package.json          -配置/包管理文件

## app应用代码结构

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
├─types                 -文件夹-申明全局类型
├─index.html            -站点主入口html
├─vite.config.ts        -VITE-打包编译文件
├─tsconfig.json         -TS-配置文件
└─package.json          -配置/包管理文件


