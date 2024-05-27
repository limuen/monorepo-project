# monorepo-project

基于 turborepo 开发项目。

## 安装依赖和运行

```bash
# 运行所有项目
$ pnpm run dev
# 运行指定名称项目
$ pnpm run dev --filter [name] # name 为项目名称

# 打包所有项目
$ pnpm run build
# 打包指定名称项目
$ pnpm run build --filter [name] # name 为项目名称
```

## 项目目录结构

```text
limuen-monorepo-project
├─ apps                    # 项目文件
│  └─ defaultProject       # 构建viteDemo
│  └─ miniLocalLiftProject # Taro小程序Demo
│  └─ react-low-code       # react低代码平台
├─ packages                # 项目公共库
│  ├─ viteconfig           # vite库的配置
│  ├─ utils                # 常用公共的方法文件
│  ├─ tsconfig             # tsconfig的公共配置
│  ├─ request              # axios请求库的公共配置(仅限PC端)
│  ├─ stores               # 基于zustand状态公共管理库
├─ turbo                   # plop
│  ├─ generators           # 模板列表
│  │  └─ react-components  # packages/components 下的模板
├─ .commitlintrc.js        # git 提交配置
├─ .eslintrc.js            # ESLint 校验配置
├─ .gitignore              # git 提交忽略
├─ package.json            # 依赖包管理
├─ pnpm-lock.yaml          # pnpm 安装依赖锁文件
├─ pnpm-workspace.yaml     # pnpm 工作空间配置
├─ README.md               # 项目介绍
├─ tsconfig.json           # typescript 全局配置
└─ turbo.json              # turbo 配置文件
```
