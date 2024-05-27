/* UserState */
export interface UserState {
  token: string;
}

export interface UserAction {
  setToken: (token: UserState["token"]) => void;
}
