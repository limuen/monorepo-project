import { describe, test, expect, beforeAll, afterAll } from "vitest";
import {
  is,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isAsyncFunction,
  isPromise,
  isString,
  isBoolean,
  isArray,
  isClient,
  isWindow,
  isElement,
  isNull,
  isNullOrUnDef,
  isHexColor,
  isEmptyObject,
  isHttp
} from "./index";

describe("Utility Functions Tests", () => {
  test("is function checks types correctly", () => {
    expect(is({}, "Object")).toBe(true);
    expect(is([], "Array")).toBe(true);
    expect(is(null, "Null")).toBe(true);
  });

  test("isFunction checks if value is a function", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(123)).toBe(false);
  });

  test("isDef checks if value is defined", () => {
    expect(isDef(0)).toBe(true);
    expect(isDef(undefined)).toBe(false);
  });

  test("isUnDef checks if value is undefined", () => {
    expect(isUnDef(undefined)).toBe(true);
    expect(isUnDef(null)).toBe(false);
  });

  test("isObject checks if value is an object", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
  });

  test("isDate checks if value is a date", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate("2023-01-01")).toBe(false);
  });

  test("isNumber checks if value is a number", () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber("123")).toBe(false);
  });

  test("isAsyncFunction checks if value is an AsyncFunction", () => {
    expect(isAsyncFunction(async () => {})).toBe(true);
    expect(isAsyncFunction(() => {})).toBe(false);
  });

  test("isPromise checks if value is a promise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(123)).toBe(false);
  });

  test("isString checks if value is a string", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(123)).toBe(false);
  });

  test("isBoolean checks if value is a boolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });

  test("isArray checks if value is an array", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  test("isClient checks if it is the client", () => {
    expect(isClient()).toBe(typeof window !== "undefined");
  });

  describe("isWindow  checks if value is a window", () => {
    beforeAll(() => {
      global.window = {} as Window & typeof globalThis;
    });

    afterAll(() => {
      if (global.window) {
        delete (global as any).window;
      }
    });

    test("should return true for the window object", () => {
      expect(isWindow(window)).toBe(true);
    });

    test("should return false for a regular object", () => {
      expect(isWindow({})).toBe(false);
    });
  });

  test("isElement checks if value is an element", () => {
    const div = document.createElement("div");
    expect(isElement(div)).toBe(true); // 预期通过
    expect(isElement({})).toBe(false); // 预期通过
  });

  test("isNull checks if value is null", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });

  test("isNullOrUnDef checks if value is null or undefined", () => {
    expect(isNullOrUnDef(null)).toBe(true);
    expect(isNullOrUnDef(undefined)).toBe(true);
    expect(isNullOrUnDef(0)).toBe(false);
  });

  test("isHexColor checks if value is a hex color", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("123456")).toBe(false);
  });

  test("isEmptyObject checks if an object is empty", () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ key: "value" })).toBe(false);
  });

  test("isHttp checks if value starts with http/https", () => {
    expect(isHttp("http://example.com")).toBe(true);
    expect(isHttp("https://example.com")).toBe(true);
    expect(isHttp("ftp://example.com")).toBe(false);
    expect(isHttp("/local/path")).toBe(false);
  });
});
