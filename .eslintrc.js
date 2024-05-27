/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  // 继承某些已有的规则
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["@typescript-eslint"],
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
    "prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 允许使用 require() 函数导入模块
    "@typescript-eslint/no-empty-function": "off", // 不允许空函数
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // react (https://github.com/jsx-eslint/eslint-plugin-react)
    "react-hooks/rules-of-hooks": "error", // 确保在组件或自定义挂钩的顶层调用挂钩
    "react-hooks/exhaustive-deps": "off" // 允许对 Hook 的依赖数组有更大的控制权
  }
};
