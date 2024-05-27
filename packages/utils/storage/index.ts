import { isString } from "../is";

type StorageKey = keyof StorageMap;

interface StorageMap {
  mgerp_searchHistory: string[];
}

/**
 * 本地缓存添加环境，通过环境区分不同的缓存
 * @param value 本地缓存键名
 * @returns 添加当前环境后的本地缓存键名
 */
const addEnvSuffix = (value: string) => {
  const env = import.meta.env.VITE_ENV;
  return env ? `${value}--${env}` : value;
};

/**
 *
 * @param {String} key 本地缓存中指定的 key
 * @param {unknown} value 需要存储的内容
 */
export function setStorage<T extends StorageKey>(key: T, value: StorageMap[T]) {
  const envKey = addEnvSuffix(key);
  const storageValue = isString(value) ? value : JSON.stringify(value);
  window.localStorage.setItem(envKey, storageValue);
}

/**
 * 获取本地缓存
 * @param {String} key 本地缓存中指定的 key
 * @param {Boolean} [remove=false] 是否立即移除指定 key 的本地缓存内容 默认为 false
 */
export function getStorage<T extends StorageKey>(key: T, remove: boolean = false): StorageMap[T] | null {
  const envKey = addEnvSuffix(key);
  const storageValue = localStorage.getItem(envKey);
  if (remove) removeStorage(key);
  if (storageValue) {
    try {
      return storageValue ? JSON.parse(storageValue) : null;
    } catch (_) {
      return storageValue as any;
    }
  } else {
    return null;
  }
}

/**
 * 从本地缓存中移除指定 key
 * @param {String} key 本地缓存中指定的 key
 */
export function removeStorage(key: StorageKey) {
  const envKey = addEnvSuffix(key);
  localStorage.removeItem(envKey);
}
