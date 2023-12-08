import { h } from 'vue';

interface Title {
  key: string;
  title: string;
}

const titles: Title[] = [];
let titleInterval;

/**
 * 设置浏览器标题
 * @ignore
 */
function setTitle(title: string) {
  document.title = title;
  const ua = navigator.userAgent;
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/;
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.png';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}

/**
 * 清理指定标题
 * @ignore
 */
function removeTitle(key: string) {
  const index = titles.findIndex(s => s.key === key);
  if (index !== -1) {
    titles.splice(index, 1);
  }
}

/**
 * 停止标题集合循环显示
 * @ignore
 */
function stopDocTitleChangeTask() {
  // 清理循环
  if (titleInterval) {
    clearInterval(titleInterval);
  }
}

/**
 * 开始标题集合循环显示
 * @ignore
 */
function startDocTitleChangeTask() {
  let _index = 0;
  titleInterval = setInterval(() => {
    _index = _index >= titles.length ? titles.length - 1 : _index;
    const item = titles[_index];
    if (!item) {
      return;
    }
    setTitle(item.title);
    if (++_index >= titles.length) {
      _index = 0;
    }
  }, 1500);
}

/**
 * 设置浏览器标题
 * @param title 标题内容
 * @param key 唯一标识，用来支持多个标题切换。
 */
export function setDocumentTitle(title: string, key = 'default') {
  stopDocTitleChangeTask();

  setTitle(title);

  // 如果已存在的数据，删除，并插入到最后
  removeTitle(key);
  titles.push({
    key,
    title,
  });

  startDocTitleChangeTask();
}

/**
 * 删除浏览器指定标题
 * @param key 唯一标识，用来支持多个标题切换
 */
export function removeDocumentTitle(key: string) {
  removeTitle(key);
  startDocTitleChangeTask();
}
