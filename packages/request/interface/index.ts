// Request response parameters (excluding data)
export interface Result {
  code: number;
  msg: string;
}

// Request response parameters (including data)
export interface ResultData<T = any> extends Result {
  result: T;
}

// paging request parameters
export interface ReqPage {
  current?: number;
  pageSize?: number;
}

// paging response parameters
export interface ResPage<T> {
  countId: null;
  current: number;
  maxLimit: null;
  optimizeCountSql: boolean;
  orders: [];
  pages: number;
  records: T[];
  searchCount: boolean;
  size: number;
  total: number;
}

export interface ReqLogin {
  username: string;
  password: string;
}

export interface ResLogin {
  access_token: string;
}
