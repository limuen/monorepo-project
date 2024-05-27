import { AuthAction, AuthState } from "../interface";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { getFlatMenuList, getShowMenuList } from "@limuen/utils/flatMenu";

export type AuthStoreState = AuthState & AuthAction;

export const useAuthStore = create<AuthStoreState>()(
  immer(set => ({
    // List of menu permissions
    authMenuList: [],
    // Menu permission list ==> left menu bar rendering, need to remove isHide == true
    showMenuList: [],
    // Menu permission list ==> flattened one-dimensional array menu, mainly used to add dynamic routing
    flatMenuList: [],
    // List of button permissions
    authButtonList: [],
    setAuthButtonList: authButtonList =>
      set((draft: AuthState) => {
        draft.authButtonList = authButtonList;
      }),
    setAuthMenuList: authMenuList =>
      set((draft: AuthState) => {
        draft.authMenuList = authMenuList;
        // draft.flatMenuList = getFlatMenuList(authMenuList);
        // draft.showMenuList = getShowMenuList(authMenuList);
      })
  }))
);
