import { UserAction, UserState } from "../interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getStorageSync, setStorageSync, removeStorageSync } from "@tarojs/taro";

export type UserStoreState = UserState & UserAction;

// 定义storage操作
export const asyncLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
};

export const useUserStore = create<UserStoreState>()(
  persist(
    set => ({
      token: "default-token",
      setToken: token => set({ token })
    }),
    {
      name: "limuen-user",
      version: 1.0,
      getStorage: () => asyncLocalStorage
    }
  )
);
