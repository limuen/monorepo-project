import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteConfig from "@limuen/viteconfig";

export default defineConfig(configEnv => {
  return mergeConfig(viteConfig(configEnv), {
    plugins: [react()]
  });
});
