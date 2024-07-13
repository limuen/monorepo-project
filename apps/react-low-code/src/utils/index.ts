import prettier from "prettier";
import { message } from "antd";
import parserBabel from "prettier/parser-babel";

/**
 * @description prettier 格式化代码
 * @param content 代码内容
 */
export const prettierCode = (content: string) => {
  return prettier.format(content, {
    parser: "babel",
    plugins: [parserBabel]
  });
};

/**
 * @description copy 格式化代码
 * @param content 代码内容
 */
export const copy = (value: string) => {
  const textarea = document.createElement("textarea");
  textarea.readOnly = true;
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  const result = document.execCommand("Copy");
  if (result) {
    message.success("复制成功！");
  }
  document.body.removeChild(textarea);
};
