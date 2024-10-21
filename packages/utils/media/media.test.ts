import { describe, it, expect } from "vitest";
import { resolveStaticUrl } from "./index";

describe("resolveStaticUrl function", () => {
  const mockBaseUrl = "https://static.example.com";

  it("should return the same URL if it starts with http", () => {
    const imageUrl = "http://example.com/image.jpg";
    expect(resolveStaticUrl(imageUrl, mockBaseUrl)).toBe(imageUrl);
  });

  it("should return the same URL if it starts with https", () => {
    const imageUrl = "https://example.com/image.jpg";
    expect(resolveStaticUrl(imageUrl, mockBaseUrl)).toBe(imageUrl);
  });

  it("should resolve a static URL if it is a relative path", () => {
    const imagePath = "images/photo.jpg";
    expect(resolveStaticUrl(imagePath, mockBaseUrl)).toBe("https://static.example.com/images/photo.jpg");
  });

  it("should return an empty string if the imagePath is empty", () => {
    expect(resolveStaticUrl("", mockBaseUrl)).toBe("");
  });
});
