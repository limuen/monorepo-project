import { isEmptyObject } from "../is";

/**
 * 序列化地址信息
 * @param {String} url 地址信息
 * @param {Object} [params={}] 参数信息
 * @return {String} 拼接完成后的完整地址
 */
const invalidQueryValues = ["undefined", "null", ""];
export function serializeUrl<T extends Record<string, any>>(url: string, params: T): string {
  if (!isEmptyObject(params)) {
    let queryString = "";
    if (!url.match(/\?/)) {
      queryString += "?";
    }
    for (const key in params) {
      const value = params[key];
      if (~invalidQueryValues.indexOf(value + "")) {
        continue;
      }
      queryString += `&${key}=${value}`;
    }
    url = url + queryString;
    url = url.replace(/\?&/, "?").replace(/\?$/, "");
  }
  return url;
}

/**
 * 删除对象中为false的键值对
 */
export function removeEmptyValues(obj: Record<string, any>) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value != null && value !== ""));
}

/**
 * 生成随机字符串
 */
export function uuid(len: number, radix?: number) {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}

/**
 * 指定返回字符串长度，并添加...
 */
export function interceptString(str: string = "", place: number, isEllipsis = true): string {
  if (!str) return str;
  if (str.length > place) {
    return str.substr(0, place) + (isEllipsis ? "..." : "");
  }
  return str.substr(0, place);
}
