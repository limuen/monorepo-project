// @see: https://stylelint.io
module.exports = {
  root: true,
  extends: ["stylelint-config-standard", "stylelint-config-recess-order", "stylelint-prettier/recommended"],
  overrides: [
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html"
    },
    {
      files: ["**/*.less"],
      customSyntax: "postcss-less"
    }
  ],
  rules: {
    "function-url-quotes": "always", // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["inside-block-and-after-rule", "inside-block"]
      }
    ], // 规则前需要或不允许空行
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
    "no-empty-source": null, // 禁止空源码
    "selector-class-pattern": null, // 强制选择器类名的格式
    "value-no-vendor-prefix": null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    "no-descending-specificity": null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    "custom-property-pattern": null, // 允许自定义CSS变量名
    "media-feature-range-notation": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "layer", "apply", "variants", "responsive", "screen"]
      }
    ]
  },
  ignoreFiles: ["**/.js", "/*.jsx", "/.tsx", "**/.ts", "dist/**/.css"]
};
