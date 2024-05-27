import { UserAction, UserState } from "../interface";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export type UserStoreState = UserState & UserAction;

export const useUserStore = create<UserStoreState>()(
  immer(
    persist(
      set => ({
        token: null,
        loginToRoute: "",
        setToken: token =>
          set((state: UserState) => {
            state.token = token;
          }),
        setLoginToRoute: routePath =>
          set((state: UserState) => {
            state.loginToRoute = routePath;
          })
      }),
      {
        name: "limuen-user-store",
        version: 1.0
      }
    )
  )
);
