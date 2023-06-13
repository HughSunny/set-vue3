import _ from 'lodash-es';
import dayjs from 'dayjs';

/**
 * 转换页面page参数为请求参数
 * @param params 页面参数
 */
export function convertPageRequestParam(params, pageKey = 'pageIndex') {
  const { pageSize } = params;
  const par = { ...params };
  if (pageSize) {
    par.skipCount = (params[pageKey] - 1) * pageSize;
    par.maxResultCount = pageSize;
  }
  delete par[pageKey];
  delete par.pageSize;
  return par;
}

/**
 *
 * 对 object 或 array 数组中属性进行转换
 * + id -> value,
 * + name -> label,
 * + +pid,
 * + +nodeIds,
 * @param {Array|Object} data 要转换的数据
 * @param {Object} parent 父级
 */
export function toDataSource(data, parent = {}) {
  const pid = parent.id;
  if (_.isPlainObject(data)) {
    const nodeIds = _.cloneDeep(parent.nodeIds || []);
    nodeIds.push(data.id);
    const item = {
      ...data,
      label: data.name,
      value: data.id,
      pid,
      nodeIds,
    };
    return {
      ...item,
      children: toDataSource(data.children, item),
    };
  }
  if (Array.isArray(data)) {
    return data.map(s => {
      const nodeIds = _.cloneDeep(parent.nodeIds || []);
      nodeIds.push(s.id);
      const item = {
        ...s,
        label: s.name,
        value: s.id,
        pid,
        nodeIds,
      };
      return {
        ...item,
        children: toDataSource(s.children, item),
      };
    });
  }
  return data;
}

/**
 * 根据给 id 获取集合元素对应项
 */
export function getItemFromDataSourceById(data, id) {
  if (_.isPlainObject(data)) {
    if (data.id === id) {
      return data;
    }
    return null;
  }
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.id === id) {
        return item;
      }
      const v = getItemFromDataSourceById(item.children, id);
      if (v) {
        return v;
      }
    }
  }
  return null;
}

/**
 * 将给定值转换为数组，其中数组、null、undefined直接返回
 */
export function toArray(data) {
  if (Array.isArray(data) || _.isNil(data)) {
    return data;
  }
  return [data];
}

/**
 * 根据 antd table 的 columns 计算 X 轴值
 * @param {Array} columns 要计算的 columns 数组
 * @param {Number} offset 计算后偏移量
 */
export function getTableColumnX(columns, offset = 200) {
  if (!Array.isArray(columns)) {
    return 0;
  }
  let x = offset;
  columns.forEach(s => {
    x += s.width || 0;
  });
  return x;
}

/**
 * 计算列表list数据
 * @param {Array} list 要计算数据
 * @param {Number} [page] 当前页
 * @param {Number} [pageSize] 每页记录
 */
export function getTableData(list = [], page = 1, pageSize = 10) {
  if (!Array.isArray(list)) {
    return [];
  }
  const beforeCount = (page - 1) * pageSize;
  return list.map((o, i) => {
    const item = { ...o, index: beforeCount + i + 1 };
    return item;
  });
}

/**
 * 格式化日期为 YYYY-MM-DD
 * @param {String} date 格式日期
 * @param {String} [def=''] 非有效值时返回的默认值
 */
export function formatDate(date, def = '') {
  return date ? dayjs(date).format('YYYY-MM-DD') : def;
}

/**
 * 格式化日期为 YYYY-MM
 * @param {String} date 格式日期
 * @param {String} [def=''] 非有效值时返回的默认值
 */
export function formatYearMonth(date, def = '') {
  return date ? dayjs(date).format('YYYY-MM') : def;
}

/**
 * 转换时间区间数组 dayjs 转 string
 * @param {Array} values 要处理的时间区间数组
 * @param {Boolean} [hasTime] 是否有时间
 */
export function getRangeDate(values, hasTime = true) {
  if (!Array.isArray(values) || values.length !== 2) {
    return [undefined, undefined];
  }
  let [start, end] = values;
  const fmt = 'YYYY-MM-DD';
  if (hasTime) {
    start = dayjs(start).format(`${fmt} 00:00:00`);
    end = dayjs(end).format(`${fmt} 23:59:59`);
  } else {
    start = dayjs(start).format(fmt);
    end = dayjs(end).format(fmt);
  }

  return [start, end];
}

export function get_suffix(filename) {
  let pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos != -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}
