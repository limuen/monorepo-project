import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 配置测试选项，例如 testFiles、environment 等
    globals: true,
    environment: "jsdom" // 如果需要 DOM 支持
  }
});
