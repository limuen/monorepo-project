import { defineConfig, UserConfig, loadEnv, ConfigEnv } from "@farmfe/core";
import { resolve } from "path";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(env);

  return {
    root,
    compilation: {
      resolve: {
        symlinks: true,
        alias: {
          "@": resolve(process.cwd(), "./src")
        }
      }
    }
  };
});
