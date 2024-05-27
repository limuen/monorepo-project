import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("rc", {
    description: "添加一个新的 @limuen/components 组件",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "请输入组件名称"
      }
    ],
    actions: data => {
      if (data) {
        const componentName = /^LIMUEN/.test(data.name) ? data.name : `LIMUEN${data.name}`;
        return [
          {
            type: "add",
            path: `packages/components/src/components/${componentName}/index.tsx`,
            templateFile: "scripts/generators/react-component/component.hbs",
            data: {
              componentName
            }
          },
          {
            type: "append",
            path: "packages/components/src/index.tsx",
            template: `export * from "./components/${componentName}";`
          }
        ];
      } else {
        return [];
      }
    }
  });
}
