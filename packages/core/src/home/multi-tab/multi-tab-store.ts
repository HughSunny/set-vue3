import type { DefineComponent, InjectionKey, UnwrapRef } from 'vue';
import {
  isRef,
  watchEffect,
  onBeforeUnmount,
  h,
  KeepAlive,
  reactive,
  createVNode,
  toRaw,
  defineComponent,
  watch,
  provide,
  inject,
  computed,
} from 'vue';
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { eagerComputed } from '@vueuse/core'
import { findLast, omit } from 'lodash-es'
import type { MaybeRef } from '@/@core/interface/IAntdPro'
import type {
  CacheItem,
  MultiTabStore,
  CallerFunction,
  CacheKey
} from '@core/interface/IMultiTabStore'
import { flattenChildren } from '@core/utils/vnode-util'
import { useAppStore } from '@core/store/app';

export type Options = {
  defaultHomePage?: string;
};

export type MultiTabType = [CallerFunction];

let g = 1;
const guid = () => {
  return `CacheKey_${++g}`;
};

const MULTI_TAB_STORE_KEY: InjectionKey<MultiTabStore> = Symbol('multi-tab-store');
export const useMultiTabStateProvider = ({
  initCacheList = [],
  maxCache,
}: {
  initCacheList?: Omit<CacheItem, 'component' | 'key'>[];
  maxCache?: MaybeRef<number>;
} = {}): UnwrapRef<MultiTabStore> => {
  // 定义保留的多标签状态
  const state = reactive<MultiTabStore>({
    cacheList: [],
    current: '',
    exclude: [],
    include: [],
  });
  watchEffect(() => {
    state.maxCache = isRef(maxCache) ? maxCache.value : maxCache;
  });
  state.cacheList.push(...initCacheList.map(item => ({ ...item, key: guid() } as CacheItem)));
  provide(MULTI_TAB_STORE_KEY, state);
  return state;
};

export const injectMultiTabStore = () => {
  return inject(MULTI_TAB_STORE_KEY)!;
};

const findMatchedRoute = (
  route: RouteLocationNormalized,
): RouteRecordNormalized | RouteLocationNormalized => {
  const matched: RouteRecordNormalized[] = route.matched || [];
  const lastMergeRoute = findLast(matched, (m) => {
    return m.meta && m.meta.mergeTab
  }) as RouteRecordNormalized
  return lastMergeRoute || route
};
const componentMap: Record<string, DefineComponent> = {};
// 创建消费端
export const MultiTabStoreConsumer = defineComponent({
  name: 'MultiTabStoreConsumer',
  setup(_props, { slots = {} }) {
    const route = useRoute();
    const state = inject(MULTI_TAB_STORE_KEY)!;
    const [{ deleteCachesByKeys }] = useMultiTab();
    const appStore = useAppStore();
    const multiTab = computed(() => appStore.multiTab);
    const hasCache = (path: CacheKey) => {
      return state.cacheList.find(item => item.tabPath === path);
    };
    const cacheListLength = eagerComputed(() => state.cacheList?.length || 0);
    watch(
      [() => state.maxCache, cacheListLength],
      () => {
        if (state.maxCache && cacheListLength && state.cacheList.length > state.maxCache) {
          const clearCount = state.cacheList.length - state.maxCache;
          const sortCacheList = state.cacheList
            .filter(item => !item.lock && state.current !== item.path)
            .sort((a, b) => a.lastActiveTime - b.lastActiveTime);
          const clearList = sortCacheList.slice(0, clearCount);
          deleteCachesByKeys(clearList.map(item => item.path));
        }
      },
      { immediate: true, flush: 'post' },
    );
    watch(
      () => route.fullPath,
      () => {
        state.current = route.path;
        const index = state.cacheList.findIndex(item => item.path === route.path);
        // console.log('TAB--------------------->route.fullPath', route.path, index, state.cacheList)
        if (state.cacheList[index]) {
          state.cacheList[index].route = { ...omit(route, ['matched']) };
        }
      },
      { immediate: true },
    );
    onBeforeUnmount(() => {
      // console.log('TAB--------------------->onBeforeUnmount')
      Object.keys(componentMap).forEach(key => {
        delete componentMap[key];
      });
    });
    return () => {
      const component = flattenChildren((slots.default && slots.default()) || [])[0] as any;
      // console.log('TAB--------------------->render component', component, route.path)
      if (!component) {
        return null;
      }
      const tabRoute = findMatchedRoute(route)
      // console.log('TAB--------------------->render tabRoute', tabRoute)
      // 是否存在 cache
      let cacheItem = hasCache(tabRoute.path);
      // 标签的title是路由meta中的titie 或者 route中参数的name
      const tabTitle = (tabRoute?.meta?.title as string) || tabRoute.params?.name
      const cacheRoute = { ...omit(route, ['matched']) }
      if (!cacheItem) {
        cacheItem = {
          path: route.path,
          route: cacheRoute,
          key: guid(),
          tabTitle,
          tabPath: tabRoute.path,
          lock: !!route.meta.lock,
          lastActiveTime: Date.now()
        }
        multiTab.value ? state.cacheList.push(cacheItem) : (state.cacheList = [cacheItem]);
      } else if (cacheItem.path !== route.path) {
        // 处理 mergeTab 逻辑
        Object.assign(cacheItem, {
          path: route.path,
          route: cacheRoute,
          key: guid(),
          tabTitle,
          tabPath: tabRoute.path,
          lock: !!route.meta.lock,
          lastActiveTime: Date.now()
        } as CacheItem)
      } else {
        cacheItem.lastActiveTime = Date.now();
      }
      const exclude = [...state.exclude];
      if (route.meta.keepAlive === false) {
        exclude.push(cacheItem.key!);
      }
      // console.log('TAB--------------------->cacheItem.key', cacheItem.key, componentMap)

      const newCom =
        componentMap[cacheItem.key] ||
        defineComponent({
          name: cacheItem.key,
          setup(props, { attrs }) {
            return () => h(component, { ...props, ...attrs });
          },
        });
      // if (exclude.find(k => k === cacheItem.key)) {
      //   delete componentMap[cacheItem.key];
      // }
      componentMap[cacheItem.key] = newCom;
      return createVNode(KeepAlive, multiTab.value ? { exclude } : { include: [] }, {
        default: () =>
          h(newCom, { key: cacheItem!.key + route.fullPath.replace(route.hash || '', '') })
      })
    };
  },
});
export const useMultiTab = (/*options?: Options*/): MultiTabType => {
  const router = useRouter();
  const route = useRoute();
  const state = inject(MULTI_TAB_STORE_KEY)!;
  const clearCache = async (path: CacheKey) => {
    const cacheItem = state.cacheList.find(item => item.path === path);
    state.exclude = [cacheItem?.key as string];
    new Promise<void>(resolve => {
      setTimeout(() => {
        state.exclude = [];
        resolve();
      });
    });
  };

  const close = (path?: CacheKey) => {
    if (!path) {
      path = state.current;
    }
    const currentPageIndex = state.cacheList.findIndex(item => item.path === path);
    if (state.cacheList.length === 1) {
      message.info('这是最后一个标签了, 无法被关闭');
      return;
    }
    clearCache(path);
    if (path !== state.current) {
      state.cacheList.splice(currentPageIndex, 1);
      return;
    }
    const targetIndex = currentPageIndex === 0 ? currentPageIndex + 1 : currentPageIndex - 1;
    router
      .replace(state.cacheList[targetIndex].route)
      .then(() => {
        state.cacheList.splice(currentPageIndex, 1);
      })
      .catch();
  };

  const getCaches = () => {
    return state.cacheList;
  };

  // alias
  const refresh = async (path?: CacheKey | undefined) => {
    if (!path) {
      path = state.current;
    }
    await clearCache(path);
    const cacheItemIndex = state.cacheList.findIndex(item => item.path === path);
    const cacheItem = state.cacheList[cacheItemIndex];
    state.cacheList[cacheItemIndex] = { ...toRaw(cacheItem), key: guid() };
    return new Promise<void>(resolve => {
      router.replace(cacheItem?.route || { path }).finally(() => {
        // 模拟loading效果，加载太快，loading 不明显，主动加个延时 ，如不需要可删除延迟
        setTimeout(() => {
          resolve();
        }, 900);
      });
    });
  };

  const deleteCaches = async (start: number, num: number) => {
    const list = state.cacheList;
    const end = start + num;
    const newList: CacheItem[] = [];
    const deleteKeyList: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (i < start || i >= end || item.lock) {
        newList.push(item);
      } else {
        deleteKeyList.push(item.key);
        delete componentMap[item.key];
      }
    }
    state.exclude = deleteKeyList;
    state.cacheList = newList;
    return new Promise<void>(resolve => {
      setTimeout(() => {
        state.exclude = [];
        resolve();
      });
    });
  };

  const deleteCachesByKeys = async (paths: string[]) => {
    const list = state.cacheList;
    const newList: CacheItem[] = [];
    const deleteKeyList: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (paths.indexOf(item.path) === -1) {
        newList.push(item);
      } else {
        deleteKeyList.push(item.key);
        delete componentMap[item.key];
      }
    }
    state.exclude = deleteKeyList;
    state.cacheList = newList;
    return new Promise<void>(resolve => {
      setTimeout(() => {
        state.exclude = [];
        resolve();
      });
    });
  };

  const closeLeft = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(item => item.path === selectedPath);
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path);
    if (currentIndex < index) {
      router
        .replace(state.cacheList[index].route)
        .then(() => {
          deleteCaches(0, index);
        })
        .catch();
    } else {
      deleteCaches(0, index);
    }
  };

  const closeRight = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(item => item.path === selectedPath);
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path);
    if (currentIndex > index) {
      router
        .replace(state.cacheList[index].route)
        .then(() => {
          deleteCaches(index + 1, state.cacheList.length - index - 1);
        })
        .catch();
    } else {
      deleteCaches(index + 1, state.cacheList.length - index - 1);
    }
  };

  const closeOther = (selectedPath: CacheKey) => {
    const index = state.cacheList.findIndex(cached => cached.path === selectedPath);
    router
      .replace(state.cacheList[index].route)
      .then(async () => {
        await deleteCaches(index + 1, state.cacheList.length - index - 1);
        await deleteCaches(0, index);
      })
      .catch();
  };

  return [
    {
      deleteCachesByKeys,
      close,
      getCaches,
      clearCache,
      closeLeft,
      closeRight,
      closeOther,
      refresh,
    },
  ];
};

export default useMultiTab;
