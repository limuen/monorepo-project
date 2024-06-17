import { defineConfig, mergeConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import eslintPlugin from "vite-plugin-eslint";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import viteConfig from "@limuen/viteconfig";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

export default defineConfig(configEnv => {
  return mergeConfig(viteConfig(configEnv), {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    plugins: [
      vue(),
      // vue 可以使用 jsx/tsx 语法
      vueJsx(),
      // esLint 报错信息显示在浏览器界面上
      eslintPlugin(),
      // name 可以写在 script 标签上
      vueSetupExtend({}),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ]
  });
});
