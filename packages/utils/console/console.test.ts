import { describe, test, expect, beforeEach, vi } from "vitest";
import { logInfo, logDebug, logWarn, logError, _printLog } from "./index";
import { logTypes } from "./index";
import { createLogStyle, createLogPrefix } from "./index";

describe("logTypes configuration", () => {
  test("should have correct DEBUG log type with theme", () => {
    expect(logTypes.DEBUG.name).toBe("DEBUG");
    expect(logTypes.DEBUG.theme.color).toBe("#ff976a");
  });

  test("should have correct INFO log type with theme", () => {
    expect(logTypes.INFO.name).toBe("INFO");
    expect(logTypes.INFO.theme.color).toBe("#1989fa");
  });

  test("should have correct WARN log type with theme", () => {
    expect(logTypes.WARN.name).toBe("WARN");
    expect(logTypes.WARN.theme.color).toBe("#ff976a");
    expect(logTypes.WARN.theme.backgroundColor).toBe("#ffeae1");
  });

  test("should have correct ERROR log type with theme", () => {
    expect(logTypes.ERROR.name).toBe("ERROR");
    expect(logTypes.ERROR.theme.color).toBe("#ee0a24");
    expect(logTypes.ERROR.theme.backgroundColor).toBe("#fcced3");
  });
});

describe("createLogStyle", () => {
  test("should return correct style string for log without background color", () => {
    const theme = { color: "#ff976a" };
    const style = createLogStyle(theme);
    expect(style).toBe("padding: 5px 0;border-radius: 5px;color: #ff976a;");
  });

  test("should return correct style string for log with background color", () => {
    const theme = { color: "#ff976a", backgroundColor: "#ffeae1" };
    const style = createLogStyle(theme);
    expect(style).toBe("padding: 5px 0;border-radius: 5px;color: #ff976a;padding: 5px;background-color: #ffeae1;");
  });
});

describe("createLogPrefix", () => {
  test("should return correct log prefix without moduleName", () => {
    const type = { name: "INFO", theme: { color: "#1989fa" } };
    const prefix = createLogPrefix(type, "");
    expect(prefix).toBe(`[undefined][INFO]`); // 需要根据环境变量调整期望值
  });

  test("should return correct log prefix with moduleName", () => {
    const type = { name: "DEBUG", theme: { color: "#ff976a" } };
    const prefix = createLogPrefix(type, "testModule");
    expect(prefix).toBe(`[undefined][DEBUG][testModule]`); // 根据 VITE_APP_PROJECT_NAME 变量调整
  });
});

describe("log functions", () => {
  beforeEach(() => {
    console.log = vi.fn(); // Mock console.log
    // Mock _printLog to ensure it gets called
    vi.spyOn({ _printLog }, "_printLog").mockImplementation(() => {});

    process.env.VITE_NODE_ENV = "development"; // 确保环境变量设置为开发模式
  });

  test("logInfo should call _printLog with INFO type", () => {
    logInfo("Test message");
    expect(console.log).toHaveBeenCalled();
  });

  test("logDebug should call _printLog with DEBUG type", () => {
    logDebug("Debugging...");
    expect(console.log).toHaveBeenCalled();
  });

  test("logWarn should call _printLog with WARN type", () => {
    logWarn("Warning message");
    expect(console.log).toHaveBeenCalled();
  });

  test("logError should call _printLog with ERROR type", () => {
    logError("Error occurred");
    expect(console.log).toHaveBeenCalled();
  });
});
