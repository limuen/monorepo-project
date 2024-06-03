import { transform } from "@babel/standalone";
import { TIME_FORMAT } from "@/constants/storageNames";
import { $eval } from "@/utils/eval";

// 包含import export返回一个组件整体
export const getRenderTemplate = (type: "customer" | "time" | "template" | "tooltip") => {
  const templateMap = {
    customer: () => {
      return `(text, record) => {
  return text
}`;
    },
    time: () => {
      return `(text) => dayjs(text).format('${TIME_FORMAT}')`;
    },
    template: () => {
      return `(text, record) => \`\${text}\``;
    },
    tooltip: () => {
      return `(text) => <Tooltip title={text}>
  {text}
</Tooltip>`;
    },
    map: () => {
      return `(text)=>{
  const map = {}
  return map[text]
}`;
    }
  };
  return templateMap[type]();
};

// 生成render方法，识别组件<与组件名
export const generateRender = (reactString: any) => {
  return $eval(
    transform(reactString, {
      presets: ["react"]
    }).code as any
  );
};
