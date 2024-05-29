import prettier from "prettier";
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
