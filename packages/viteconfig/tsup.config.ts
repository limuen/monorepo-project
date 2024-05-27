import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    // 入口文件
    entry: ["src/vite.config.ts"],
    // 是否生成对应的调试源文件
    sourcemap: false,
    // 打包之前是否先清空dist文件
    clean: false,
    // 是否压缩代码
    minify: true,
    // 输出格式
    format: "esm",
    // 是否进行拆分
    splitting: false,
    // 忽略监听的文件
    ignoreWatch: ["assets", "public"],
    // 是否开启垫片
    shims: true,
    // 是否生成dts文件
    dts: true,
    loader: {
      // .png 为后缀的文件将按 base64 处理
      ".png": "base64",
      // .webp为后缀的文件将按 file 处理
      ".webp": "file"
    },
    // 打包成功后的回调函数
    async onSuccess() {
      console.log("success");
    }
  };
});
