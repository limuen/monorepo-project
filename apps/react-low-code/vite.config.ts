import { defineConfig, mergeConfig } from "vite";
import viteConfig from "@limuen/viteconfig";
import { codeInspectorPlugin } from "code-inspector-plugin";

export default defineConfig(configEnv => {
  return mergeConfig(viteConfig(configEnv), {
    plugins: [
      codeInspectorPlugin({
        bundler: "vite"
      })
    ]
  });
});
