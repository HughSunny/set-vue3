import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
export type CacheKey = string

export type CallerFunction = {
  close: (path: CacheKey) => void // 关闭指定路径标签
  closeLeft: (selectedPath: CacheKey) => void // 关闭指定路径左侧标签
  closeRight: (selectedPath: CacheKey) => void // 关闭指定路径右侧标签
  closeOther: (selectedPath: CacheKey) => void // // 关闭除指定路径之外的标签
  getCaches: () => void // 获取缓存列表
  clearCache: (path: CacheKey) => void // 清空缓存
  refresh: (path?: CacheKey | undefined) => void // 刷新指定路径
  deleteCachesByKeys: (keys: CacheKey[]) => void // 删除指定缓存
}

export interface CacheItem {
  path: CacheKey
  route: Omit<RouteLocationNormalized, 'matched'>
  lastActiveTime: number
  key?: string
  lock?: boolean
  tabTitle?: string
  tabPath?: string
}

export interface MultiTabStore {
  cacheList: CacheItem[]
  current: CacheKey
  include: string[]
  exclude: string[]
  maxCache?: number // 最大缓存数
}
