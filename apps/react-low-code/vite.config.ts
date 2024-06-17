import { defineConfig, mergeConfig } from "vite";
import viteConfig from "@limuen/viteconfig";

export default defineConfig(configEnv => {
  return mergeConfig(viteConfig(configEnv), {});
});
