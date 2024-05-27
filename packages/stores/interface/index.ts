import { RouteObject } from "react-router-dom";

export interface MetaProps {
  key?: string;
  icon?: string;
  title?: string;
  activeMenu?: string;
  isLink?: string;
  isHide?: boolean;
  isFull?: boolean;
  isAffix?: boolean;
  // isKeepAlive?: boolean;
}

export type RouteObjectType = Omit<RouteObject, "children"> & {
  redirect?: string;
  meta?: MetaProps;
  children?: RouteObjectType[];
};

/* UserState */
export interface TokenInfo {
  expireTime: number;
  login: boolean;
  token: string;
}

export interface UserState {
  token: TokenInfo | null;
  loginToRoute: string;
}

export interface UserAction {
  setToken: (token: UserState["token"]) => void;
  setLoginToRoute: (token: UserState["loginToRoute"]) => void;
}

/* AuthState */
export interface AuthState {
  authMenuList: RouteObjectType[];
  showMenuList: RouteObjectType[];
  flatMenuList: RouteObjectType[];
  authButtonList: string[];
}

export interface AuthAction {
  setAuthButtonList: (authButtonList: AuthState["authButtonList"]) => void;
  setAuthMenuList: (authMenuList: AuthState["authMenuList"]) => void;
}
