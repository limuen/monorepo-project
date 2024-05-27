/**
 * @description：request configuration
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 820004,
  TIMEOUT = 30000,
  TYPE = "success"
}

/**
 * @description：request method
 */
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE"
}

/**
 * @description：Commonly used contentTyp types
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // text
  TEXT = "text/plain;charset=UTF-8",
  // form-urlencoded generally cooperates with qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data upload
  FORM_DATA = "multipart/form-data;charset=UTF-8"
}
