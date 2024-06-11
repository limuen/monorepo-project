/* FARM_ */
declare type Recordable<T = any> = Record<string, T>;

declare interface FarmEnv {
  FARM_ENV: "dev" | "" | "test";
  FARM_GLOB_APP_TITLE: string;
  FARM_PORT: number;
  FARM_OPEN: boolean;
  FARM_REPORT: boolean;
  FARM_ROUTER_MODE: "hash" | "history";
  FARM_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
  FARM_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  FARM_DROP_CONSOLE: boolean;
  FARM_PUBLIC_PATH: string;
  FARM_API_URL: string;
  FARM_PROXY: [string, string][];
}

interface ImportMetaEnv extends FarmEnv {
  __: unknown;
}
interface FarmOptions {
  __dirname: string;
}
