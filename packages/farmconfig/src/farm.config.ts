import { defineConfig, UserConfig, loadEnv, ConfigEnv } from "@farmfe/core";
import { wrapperEnv } from "./scripts/getEnv";
import { createProxy } from "./scripts/proxy";
import { resolve } from "path";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const farmEnv = wrapperEnv(env);
  console.log(farmEnv);

  return {
    root,
    compilation: {
      resolve: {
        symlinks: true,
        alias: {
          "@": resolve(process.cwd(), "./src")
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: farmEnv.FARM_PORT,
      open: farmEnv.FARM_OPEN,
      cors: true,
      proxy: createProxy(farmEnv.FARM_PROXY)
    }
  };
});
