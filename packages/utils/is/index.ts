/**
 * @description: Check if a value is of a certain type.
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  Check if a value is a function.
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}

/**
 * @description: Check if a value is defined.
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/**
 * @description: Check if a value is undefined.
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * @description: Check if a value is an object.
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

/**
 * @description: Check if a value is a date.
 */
export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

/**
 * @description: Check if a value is a number.
 */
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

/**
 * @description: Check if a value is an AsyncFunction.
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "AsyncFunction");
}

/**
 * @description: Check if a value is a promise.
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description: Check if a value is a string.
 */
export function isString(val: unknown): val is string {
  return is(val, "String");
}

/**
 * @description: Checks if the value is of boolean type.
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

/**
 * @description: Checks if the value is an array.
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: Checks if it's the client.
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: Checks if it's a browser.
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: Checks if it's an element.
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: Checks if the value is null.
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description: Checks if the value is null or undefined.
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @description: Checks if it's a hexadecimal color.
 */
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/**
 * @description: 判断是否是空对象
 * @param {Record<string, any>} obj
 * @return {Boolean}
 */
export function isEmptyObject(obj: any): boolean {
  if (obj === null || typeof obj !== "object") {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/**
 * @description: 校验是否以 http/https 开头
 */
export function isHttp(path: string) {
  return /^(http|https):\/\//.test(path);
}
