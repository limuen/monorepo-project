import { describe, it, expect, beforeEach, vi } from "vitest";
import { serializeUrl, removeEmptyValues, uuid, shortUuid, interceptString, downloadFile } from "./index";

describe("serializeUrl", () => {
  it("should serialize URL with params", () => {
    const url = "http://example.com";
    const params = { name: "John", age: 30 };
    expect(serializeUrl(url, params)).toBe("http://example.com?name=John&age=30");
  });

  it("should handle invalid query values", () => {
    const url = "http://example.com";
    const params = { name: undefined, age: null, city: "" };
    expect(serializeUrl(url, params)).toBe("http://example.com");
  });
});

describe("removeEmptyValues", () => {
  it("should remove empty values from the object", () => {
    const obj = { a: 1, b: null, c: "", d: 4 };
    expect(removeEmptyValues(obj)).toEqual({ a: 1, d: 4 });
  });

  it("should return an empty object if all values are empty", () => {
    const obj = { a: null, b: "", c: undefined };
    expect(removeEmptyValues(obj)).toEqual({});
  });
});

describe("uuid", () => {
  it("should generate a valid UUID", () => {
    const id = uuid();
    expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
  });
});

describe("shortUuid", () => {
  it("should generate a short UUID", () => {
    const id = shortUuid();
    expect(id).toMatch(/[0-9a-f]{6}/);
  });
});

describe("interceptString", () => {
  it("should return original string if shorter than place", () => {
    expect(interceptString("Hello", 10)).toBe("Hello");
  });

  it("should truncate string and add ellipsis", () => {
    expect(interceptString("Hello World", 5)).toBe("Hello...");
  });

  it("should truncate string without ellipsis", () => {
    expect(interceptString("Hello World", 5, false)).toBe("Hello");
  });

  it("should return empty string if input is empty", () => {
    expect(interceptString("", 5)).toBe("");
  });
});

describe("downloadFile", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    global.URL.createObjectURL = vi.fn(() => "mocked-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("creates a downloadable link", () => {
    const fileName = "test.txt";
    const content = "Test content";

    downloadFile(fileName, content);

    const link = document.querySelector("a[download]") as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.download).toBe(fileName);
    expect(link.href).toContain("mocked-url");
  });
});
