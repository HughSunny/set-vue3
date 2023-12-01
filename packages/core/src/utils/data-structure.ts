import { cloneDeep, groupBy, without } from 'lodash-es';
import { isObject } from '@core/utils';
// 数据结构相关工具方法

/**
 * 过滤数组中空数据
 * @param array
 */
export function withoutArrayNil(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  return without(array, '', undefined, null);
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 *  数组转tree结构数据
 * @param data
 * @param data[].id 主键id
 * @param data[].parentId 父级id
 * @param [clone=true] 是否深度克隆
 */

export function arrayToTree(data: Record<string, any>[], clone = true): Record<string, any>[] {
  if (!Array.isArray(data)) {
    return [];
  }

  // 深拷贝，防止污染原来的数据集合
  if (clone) {
    data = cloneDeep(data);
  }

  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 key 的 map 索引数据列
  const map = {};
  data.forEach(function (item) {
    map[item.key || item.id || ''] = item;
  });
  const tree = [];
  data.forEach(function (item) {
    // 以当前遍历项的parentId ,去map对象中找到索引的id
    const parent = map[item.parentId];
    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引id,那么直接把 当前的item添加到 tree结果集中，作为顶级
      // @ts-ignore
      tree.push(item);
    }
  });
  return tree;
}

/**
 *  tree 转简单数组
 * @param data
 * @param [clone=true] 是否深度克隆
 */
export function treeToArray<T>(data: T[], clone = true): T[] {
  const arr = [];

  const treeToOneArray = tree => {
    if (!tree) {
      return;
    }

    if (Array.isArray(tree)) {
      tree.forEach(s => {
        treeToOneArray(s);
      });
      return;
    }

    const { children, ...item } = tree;
    // @ts-ignore
    arr.push(item);
    treeToOneArray(children);
  };

  // 深拷贝，防止污染原来的数据集合
  if (clone) {
    data = cloneDeep(data);
  }

  treeToOneArray(data);
  return arr;
}

// 去重
export const reduceArr = (temp, name = 'name') => {
  for (let i = 0; i < temp.length - 1; i++) {
    for (let j = i + 1; j < temp.length; j++) {
      if (temp[i][name] == temp[j][name]) {
        temp.splice(j, 1);
        j--;
      }
    }
  }
  return temp;
};

/**
 * 合并数组，后面替换前面
 * @param key 数组主键
 * @param arrList 待合并的数组
 */
export function mergeArray(key = 'id', ...arrList: any[][]) {
  let map = {};
  if (Array.isArray(arrList)) {
    arrList.forEach(arr => {
      map = Object.assign(
        {},
        map,
        groupBy(arr, s => s[key]),
      );
    });
  }
  return Object.keys(map)
    .map(s => map[s])
    .flat(1);
}

/**
 * 在树中找到节点的路径
 * @param tree
 * @param targetValue 目标值
 * @returns 路径
 */
export const findNodePathInTree = (tree, targetValue, modalKey = 'id') => {
  function traverse(node, path) {
    if (node[modalKey] === targetValue) {
      return path;
    }

    if (node.children) {
      for (const child of node.children) {
        const result = traverse(child, path.concat(child[modalKey]));
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  return traverse(tree, [tree[modalKey]]);
};

/**
 * 数组通过field 分组 转化成二层树
 * @param arr 目标对象数组
 * @param fieldName  分组字段
 * @param keyModal 主键字段名
 * @returns
 */
export function classifyArrayBySameField2Tree(arr, fieldName, keyModal = 'title') {
  const temObj = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!temObj[item[fieldName]]) {
      temObj[item[fieldName]] = [item];
    } else {
      temObj[item[fieldName]].push(item);
    }
  }
  const resArr = [];
  Object.keys(temObj).forEach(key => {
    resArr.push({
      [keyModal]: key,
      // title: '',
      children: temObj[key],
    });
  });
  return resArr;
}
