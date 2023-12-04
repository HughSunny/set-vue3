import {
  SetFieldType,
  type SetFormRowField,
  type SetFormField,
  type SetFieldGenerateRow,
} from '@/entity/set-form';
import { useI18n } from '@xdc/core';
import { getInitOptions } from '@/index';
export const getFieldNoticeAction = (field: SetFormField) => {
  const useI18nFunc = getInitOptions().useI18nHook || useI18n;
  const { t } = useI18nFunc();
  const fieldLabel = t(field.label + '');
  const type = field.type;
  if (
    type === SetFieldType.Select ||
    type === SetFieldType.CheckBox ||
    type === SetFieldType.TimePicker ||
    type === SetFieldType.DateRange ||
    type === SetFieldType.Radio ||
    type === SetFieldType.TreeSelect ||
    type === SetFieldType.Switch ||
    type === SetFieldType.Cascader
  ) {
    return t('sys.action.pleaseSelect', { label: fieldLabel });
  } else if (
    type === SetFieldType.Input ||
    type === SetFieldType.InputNumber ||
    type === SetFieldType.InputArea
  ) {
    return t('sys.action.pleaseInput', { label: fieldLabel });
  } else if (
    type === SetFieldType.File ||
    type === SetFieldType.MultiFile ||
    type === SetFieldType.Image ||
    type === SetFieldType.MultiImageFile
  ) {
    return t('sys.action.pleaseUpload', { label: fieldLabel });
  }
  return null;
};

export const getFieldWarningNotice = (field: SetFormField) => {
  const useI18nFunc = getInitOptions().useI18nHook || useI18n;
  const { t } = useI18nFunc();
  const action = getFieldNoticeAction(field);

  if (action) {
    // console.log('getFieldWarningNotice ----------------->', action + fieldLabel)
    // return `${action}${fieldLabel}`
    return action;
  }
  return t('sys.status.notNull');
};

export function validateField(fields: SetFormField[], key, value) {
  const useI18nFunc = getInitOptions().useI18nHook || useI18n;
  const { t } = useI18nFunc();

  const fieldMatch: SetFormField = fields.find(field => field.model === key) as SetFormField;
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
      !(fieldMatch.type === 'select' && value === 0) &&
      (!value || value.length === 0)
    ) {
      return getFieldWarningNotice(fieldMatch);
    }
  } else {
    if (value === null || value === undefined || value === '') {
      return;
    }
  }
  // 数字默认空是undefined
  if (fieldMatch.type === 'number') {
    if (Number.isNaN(Number.parseFloat(value))) {
      return t('sys.action.pleaseInput') + t('sys.constant.numberValue');
    }
  }

  if (fieldMatch.rules) {
    const failedRule = fieldMatch.rules.find(rule => {
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

export function generateRuleField<T extends SetFormField>(fields: T[], field: T): T {
  const trigger =
    field.type === SetFieldType.Image ||
    field.type === SetFieldType.File ||
    field.type === SetFieldType.MultiFile ||
    field.type === SetFieldType.MultiImageFile
      ? ['change']
      : ['blur', 'change'];
  let rules: any[] = [
    {
      key: 'RequireRule',
      validator: (rule, value, callback) => {
        const result = validateField(fields, field.model, value);
        // console.log('validateField--------------->', result, ';', field, value)
        if (result) {
          return Promise.reject(result);
        } else {
          return Promise.resolve();
        }
        callback();
      },
      trigger,
    },
  ];

  if (field.rules) {
    rules = [...rules, ...field.rules];
  }
  // 获取附加的rule
  rules.push(...getFieldExtraRules(field));

  // 如果值是数组，必须添加新的rule
  if (
    field.type.indexOf('range') !== -1 ||
    field.type === SetFieldType.CheckBox ||
    field.type === SetFieldType.MultiSelect ||
    field.type.indexOf('multi') !== -1
  ) {
    rules.push(...getArrayRules(field));
  }
  return {
    ...field,
    key: field.model || newGuid(),
    rules,
  };
}

export const getFieldExtraRules = (field: SetFormField) => {
  const useI18nFunc = getInitOptions().useI18nHook || useI18n;
  const { t } = useI18nFunc();
  const rules: any[] = [];
  const { params, type } = field;
  if (params?.maxLength && (type === SetFieldType.Input || type === SetFieldType.InputArea)) {
    // 如果是输入款加入 长度限制
    rules.push({
      max: params.maxLength,
      message: t('sys.constant.lengthNotMoreThan') + params.maxLength,
      trigger: 'blur',
    });
  }
  return rules;
};
/**
 * 获取数组类型的特定rule
 * @param field
 * @returns
 */
export const getArrayRules = (field: SetFormField) => {
  return [{ type: 'array', required: field.required, message: getFieldNoticeAction(field) }];
};

/**
 * 生成带rule的field
 * @param fields
 * @param section
 * @returns
 */
export function getRuleFieldList<T extends SetFormField>(fields: T[], section): T[] {
  return fields
    .filter(field => {
      return !section || field.section === section;
    })
    .map(field => {
      return generateRuleField(fields, field);
    });
}

export function getRuleFieldRow(fields: SetFormRowField[], section: string, optionList?: any[]) {
  const rows: SetFieldGenerateRow[] = [];

  if (!fields) {
    return rows;
  }
  let row: SetFieldGenerateRow = {
    key: '',
    children: [],
  };
  let rowSpan = 25;
  fields
    .filter(field => {
      return (!section || field.section === section) && !field.invisible;
    })
    .map(field => {
      return generateRuleField(fields, field);
    })
    .forEach(field => {
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
            key: field.model || `${newGuid()}row`,
            children: [field],
          };
          rows.push(row);
        }
      }
    });
  // console.log('getRuleFieldRow', rows);
  return rows;
}
export function requireField(fields: SetFormRowField[], key: string, needRequire: boolean) {
  fields.forEach(field => {
    if (field.model === key) {
      field.required = needRequire;
    }
  });
  return fields;
}

/**
 * field 需要require
 * @param {*} rows
 * @param {*} modelKey
 * @param {*} needRequire
 */
export function requireFieldRow(rows, fields, modelKey, needRequire) {
  rows.forEach(rowItem => {
    const { children } = rowItem;
    const findItem = children.find(item => item.model === modelKey);
    if (findItem) {
      const hasRequire = !!findItem.rules.find(rule => rule.key === 'RequireRule');
      if (needRequire) {
        if (!hasRequire) {
          findItem.rules.push({
            key: 'RequireRule',
            validator: (rule, value, callback) => {
              const result = validateField(fields, modelKey, value);
              if (result) {
                return Promise.reject(result);
              } else {
                return Promise.resolve();
              }
              // if (result) {
              //   callback(new Error(result))
              // }

              // callback()
            },
            trigger: ['blur', 'change'],
          });
        }
      }
    }
  });
  return rows;
}
/**
 * 给field 设置值
 * @param {*} fields
 * @param {*} modelKeys
 * @param {*} obj
 */
export function setFields(localFields, modelKeys, obj, isInit = false) {
  const getNewFields = () =>
    localFields.map(field => {
      if (modelKeys.indexOf(field.model) !== -1) {
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
      if (modelKeys.indexOf(field.model) !== -1) {
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
export function setRows(localRows, modelKeys, obj, isInit = false) {
  localRows.forEach(rowItem => {
    const { children } = rowItem;
    const findItems = children.find(item => modelKeys.indexOf(item.model) !== -1);
    if (findItems && findItems.length > 0) {
      children.forEach((row, index) => {
        if (modelKeys.indexOf(row.model) !== -1) {
          children[index] = { ...row, ...obj };
        }
      });
    }
  });
  if (!isInit) {
    return localRows;
  }

  return localRows.map(rowItem => {
    const { children } = rowItem;
    const findItems = children.filter(item => modelKeys.indexOf(item.model) !== -1);
    if (findItems && findItems.length > 0) {
      const newList = children.map(field => {
        if (modelKeys.indexOf(field.model) !== -1) {
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
 *  根据 field 项目 从 info 抽取值
 * @param fields
 * @param info
 * @param postfix 后缀
 * @returns {{id: string}}
 */
export const getFieldValue = (fields, info, postfix) => {
  const value = { id: `${postfix ? postfix : 'value'}` };
  fields.forEach(item => {
    if (item.model) {
      const keyName = `${item.model}${postfix ? postfix : ''}`;
      value[item.model] = info[keyName] === null ? undefined : info[keyName];
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
  fields.forEach(item => {
    if (item.model) {
      const keyName = `${item.model}${postfix ? postfix : ''}`;
      value[keyName] = info[item.model];
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
