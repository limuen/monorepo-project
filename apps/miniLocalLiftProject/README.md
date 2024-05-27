# 创建项目 taro init projectName

## 删除依赖

- 因为项目是在monorepo下面集成的，根目录已经配置了eslint、stylelint、prettierrc等，所以得需要在当前项目下package.json删除一些重复的依赖，不然版本不一致导致lint规则不生效，从而导致最后git 提交的时候报错
