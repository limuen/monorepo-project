import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./index.ts",
  output: [
    {
      file: "./dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "./dist/bundle.esm.js",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除 node_modules 文件夹中的文件
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-typescript",
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry",
            corejs: "3"
          }
        ]
      ], // 使用 Babel 的预设来编译代码
      extensions: [".js", ".ts"]
    }),
    terser({
      compress: {
        drop_console: true // 移除 console 语句
      },
      mangle: true // 使代码丑化（例如变量名）
    }),
    postcss({
      extract: "style/index.css",
      minimize: true // （可选）压缩CSS
    })
  ]
};
