import _ from 'lodash-es';
export const getArrayRule = (required) => {
  return { type: 'array', required, message: '请选择/上传' };
};
export function validateField(fields, key, value) {
  const fieldMatch = fields.find((field) => field.key === key);
  if (!fieldMatch) {
    return;
  }
  // debugger
  // if (fieldMatch.validate) {
  //   return
  // }
  // if (fieldMatch.type === 'switch') {
  //   return true;
  // }
  if (fieldMatch.required) {
    if (
      fieldMatch.type !== 'switch' &&
      !(fieldMatch.type === 'radio' && value === false) &&
      !(fieldMatch.type === 'number' && value === 0) &&
      (!value || value.length === 0)
    ) {
      return '不能为空';
    }
  } else {
    if (value === null || value === undefined || value === '') {
      return;
    }
  }
  // 数字默认空是undefined
  if (fieldMatch.type === 'number') {
    if (Number.isNaN(Number.parseFloat(value))) {
      return '请输入数字值';
    }
  }

  if (fieldMatch.rules) {
    const failedRule = fieldMatch.rules.find((rule) => {
      if (rule.pattern) {
        return !rule.pattern.test(value);
      }
      return false;
    });

    if (failedRule) {
      return failedRule.help;
    }
  }
  return;
}
export function getFieldList(fields, section) {
  return fields
    .filter((field) => {
      return !section || field.section === section;
    })
    .map((field) => {
      return generateRuleField(fields, field);
    });
}
export function generateRuleField(fields, field) {
  // element 版本
  // let rules = [
  //   {
  //     validator: (rule, value, callback) => {
  //       const result = validateField(fields, field.key, value)
  //       if (result) {
  //         callback(new Error(result))
  //       } else {
  //         callback()
  //       }
  //     },
  //     trigger: ['blur', 'change']
  //   }
  // ]
  let rules: any[] = [
    {
      validator: (rule, value) => {
        const result = validateField(fields, field.key, value);
        console.log('validateField--------------->', result, ';', field, value);
        if (result) {
          return Promise.reject(result);
        } else {
          return Promise.resolve();
        }
      },
      trigger: ['blur', 'change'],
    },
  ];

  if (field.rules) {
    rules = [...rules, ...field.rules];
  }
  // 如果值是数组，必须添加新的rule
  if (
    field.type.indexOf('range') !== -1 ||
    field.type === 'checkbox' ||
    field.type === 'multi-select' ||
    field.type.indexOf('multi') !== -1
  ) {
    rules = [...rules, getArrayRule(field.required)];
  }
  return {
    ...field,
    key: field.key || newGuid(),
    rules,
  };
}

export function getFieldRow(fields, section, optionList) {
  const rows = [];

  if (!fields) {
    return rows;
  }
  let row = {
    key: '',
    children: [],
  };
  let rowSpan = 25;
  fields
    .filter((field) => {
      return !section || field.section === section;
    })
    .map((field) => {
      return generateRuleField(fields, field);
    })
    .forEach((field) => {
      const { offset = 0 } = field;
      const span = field.span || 24;
      if (!field.invisible) {
        if (rowSpan + span < 25) {
          if (rowSpan + span + offset > 24) {
            field.span = 24 - rowSpan - offset;
            if (24 - rowSpan - offset < 0) {
              field.span = 0;
            }
          }
          rowSpan = rowSpan + span + offset;
          row.children.push(field);
        } else {
          rowSpan = span;
          row = {
            key: field.key || `${newGuid()}row`,
            children: [field],
          };
          rows.push(row);
        }
      }
    });
  // console.log('getFieldRow', rows);
  return rows;
}
export function requireField(fields, key, needRequire) {
  fields.forEach((field) => {
    if (field.key === key) {
      field.required = needRequire;
    }
  });
  return fields;
}

/**
 * row 需要require
 * @param {*} rows
 * @param {*} key
 * @param {*} needRequire
 */
export function requireFieldRow(rows, fields, key, needRequire) {
  rows.forEach((rowItem) => {
    const { children } = rowItem;
    const findItem = children.find((item) => item.key === key);
    if (findItem) {
      if (needRequire) {
        findItem.rules = [
          {
            validator: (rule, value, callback) => {
              const result = validateField(fields, key, value);
              if (result) {
                callback(new Error(result));
              }

              callback();
            },
            trigger: ['blur', 'change'],
          },
        ];
      } else {
        findItem.rules = null;
      }
    }
  });
  return rows;
}
/**
 * 给field 设置值
 * @param {*} fields
 * @param {*} keys
 * @param {*} obj
 */
export function setFields(localFields, keys, obj, isInit = false) {
  const getNewFields = () =>
    localFields.map((field) => {
      if (keys.indexOf(field.key) !== -1) {
        return {
          ...field,
          ...obj,
        };
      } else {
        return {
          ...field,
        };
      }
    });

  let fields = localFields;
  if (isInit) {
    fields = getNewFields();
  } else {
    fields.forEach((field, index) => {
      if (keys.indexOf(field.key) !== -1) {
        fields[index] = { ...field, ...obj };
      }
    });
  }

  return fields;
}

/**
 * 设置row属性
 * @param {*} rows
 * @param {*} key
 * @param {*} needRequire
 */
export function setRows(localRows, keys, obj, isInit = false) {
  localRows.forEach((rowItem) => {
    const { children } = rowItem;
    const findItems = children.find((item) => keys.indexOf(item.key) !== -1);
    if (findItems && findItems.length > 0) {
      children.forEach((row, index) => {
        if (keys.indexOf(row.key) !== -1) {
          children[index] = { ...row, ...obj };
        }
      });
    }
  });
  if (!isInit) {
    return localRows;
  }

  return localRows.map((rowItem) => {
    const { children } = rowItem;
    const findItems = children.filter((item) => keys.indexOf(item.key) !== -1);
    if (findItems && findItems.length > 0) {
      const newList = children.map((field) => {
        if (keys.indexOf(field.key) !== -1) {
          return {
            ...field,
            ...obj,
          };
        } else {
          return {
            ...field,
          };
        }
      });
      return {
        ...rowItem,
        children: newList,
      };
    } else {
      return {
        ...rowItem,
      };
    }
  });
}

/**
 * 设置值 测试阶段
 * @param {*} localFields
 * @param {*} localRows
 * @param {*} keys
 * @param {*} obj
 * @param {*} isInit 是否获取新对象
 */
export function setFieldsAndRows(localFields, localRows, keys, obj, isInit = false) {
  const fields = setFields(localFields, keys, obj, isInit);
  const rows = setRows(localRows, obj, isInit);
  return {
    fields,
    rows,
  };
}

/**
 *  根据 field 项目 从 info 抽取值
 * @param fields
 * @param info
 * @param postfix 后缀
 * @returns {{id: string}}
 */
export const getFieldValue = (fields, info, postfix) => {
  const value = { id: `${postfix ? postfix : 'value'}` };
  fields.forEach((item) => {
    if (item.key) {
      const keyName = `${item.key}${postfix ? postfix : ''}`;
      value[item.key] = info[keyName] === null ? undefined : info[keyName];
    }
  });
  return value;
};

/**
 * 获得 匹配 的规则的值
 * @param fields
 * @param info
 * @param postfix 后缀
 * @returns {{}}
 */
export const getMapValue = (fields, info, postfix) => {
  const value = {};
  fields.forEach((item) => {
    if (item.key) {
      const keyName = `${item.key}${postfix ? postfix : ''}`;
      value[keyName] = info[item.key];
    }
  });
  return value;
};

/**
 * 生成guid
 */
function newGuid() {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i === 8 || i === 12 || i === 16 || i === 20) guid += '-';
  }
  return guid;
}

export function getItemFromDataSourceById(data, id, key = 'id') {
  if (_.isPlainObject(data)) {
    if (data[key] === id) {
      return data;
    }
    return null;
  }
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item[key] === id) {
        return item;
      }
      const v = getItemFromDataSourceById(item.children, id, key);
      if (v) {
        return v;
      }
    }
  }
  return null;
}

export default {
  getFieldRow,
  validateField,
  requireFieldRow,
  setFields,
  setRows,
  setFieldsAndRows,
  getFieldValue,
  newGuid,
  getItemFromDataSourceById,
};
