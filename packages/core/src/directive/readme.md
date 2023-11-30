#permission 用法

route.meta.permissions 控制配置按钮、连接等显示、隐藏、可用、禁用等

支持类型

- visible 显示
- invisible 隐藏
- 
可用、禁用功能因为vue版本升级，已经不能用了
- enable 可用
- disabled 禁用
```js
const routes = [
 {
    path: `/directive1`,
    name: `directive1`,
    component: () => import('@/views/directive/index.vue'),
    meta: {
      title: `指令1`,
      keepAlive: true,
      permissions: {
        
        detail: {
          name: '详情',
          type: 'visible',
        },
        edit: {
          name: '编辑',
          type: 'invisible',
        },

        add: {
          name: '新增用户',
          type: 'enable',
        },
        sort: {
          name: '机构排序',
          type: 'disabled',
        },
      },
    },
  },
],
```
###主要用v-has

按钮显示/隐藏 v-has:[permission-name]
```vue
<template>
  <a-button v-has:add type="primary">新增(可用)</a-button>
  <a-button v-has:add1 type="primary">新增(隐藏)</a-button>
</template>
```

在页面中 使用 permissions ,需要将$route赋值给context，通过以下方法
```js
import { useRoute } from 'vue-router';
const route = useRoute();

defineExpose({
  $route: route,
});
```



按钮等操作权限，指令参数与当前路由 permissions 匹配则有效，否则隐藏。示例

```vue
<template>
  <a-button v-action:add type="primary">新增(可用)</a-button>
  <a-button v-action:sort type="primary">排序(禁用)</a-button>
  <a-button v-action:detail type="primary">详情(显示)</a-button>
  <a-button v-action:edit type="primary">编辑(隐藏)</a-button>
  <a-button v-action:test type="primary">(隐藏)</a-button>
</template>
```

### v-visible:routeName="[]"

多操作权限或处理判断 v-visible="[]" 或 v-visible:routeName="[]" 按钮 Key

```vue
<template>
  <a-button v-visible="['add']" type="primary">新增(显示)</a-button>
  <a-button v-visible="[]" type="primary">新增(隐藏)</a-button>
</template>
```