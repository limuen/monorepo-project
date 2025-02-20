import { vi, describe, it, expect, beforeEach } from "vitest";
import { setStorage, getStorage, removeStorage, StorageMap } from "./index";

describe("localStorage utility functions", () => {
  const mockStorage = new Map<string, string>();

  // Mock localStorage
  beforeEach(() => {
    mockStorage.clear();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => mockStorage.get(key) || null,
      setItem: (key: string, value: string) => mockStorage.set(key, value),
      removeItem: (key: string) => mockStorage.delete(key),
      clear: () => mockStorage.clear()
    });
  });

  it("should set and get an array in localStorage", () => {
    const key: keyof StorageMap = "searchHistory";
    const value: StorageMap[typeof key] = ["search1", "search2"];

    // 设置存储
    setStorage(key, value);

    // 检查是否存储成功
    expect(mockStorage.get(key)).toEqual(JSON.stringify(value));

    // 从 localStorage 获取存储的值
    const storedValue = getStorage(key);
    expect(storedValue).toEqual(value);
  });

  it("should remove item from localStorage", () => {
    const key: keyof StorageMap = "searchHistory";
    const value: StorageMap[typeof key] = ["search1", "search2"];

    setStorage(key, value);
    removeStorage(key);

    const storedValue = getStorage(key);
    expect(storedValue).toBeNull();
  });

  it("should handle non-JSON string storage values correctly", () => {
    const key: keyof StorageMap = "searchHistory";
    const nonJsonValue = "simpleString";

    setStorage(key, nonJsonValue as unknown as string[]);

    const storedValue = getStorage(key);
    expect(storedValue).toBe(nonJsonValue);
  });

  it("should remove item after getStorage with remove=true", () => {
    const key: keyof StorageMap = "searchHistory";
    const value: StorageMap[typeof key] = ["search1", "search2"];

    setStorage(key, value);

    // 测试获取并立即移除
    const storedValue = getStorage(key, true);
    expect(storedValue).toEqual(value);

    const afterRemoveValue = getStorage(key);
    expect(afterRemoveValue).toBeNull();
  });
});
