import React from "react";
import { Checkbox, Input, Radio, Select, Switch } from "antd";

export type FormItemType = "input" | "select" | "radio" | "checkbox" | "switch" | "textArea";

interface IProps {
  type?: FormItemType;
  options?: { label: React.ReactNode; value: string | number }[];
  valuePropName?: string;
  [key: string]: any; // 扩展属性
}

const FormItem: React.FC<IProps> = ({ type = "default", options, valuePropName, ...rest }) => {
  const inputComponent = <Input {...rest} />;
  const radioComponent = valuePropName ? <Radio {...rest} /> : <Radio.Group options={options} {...rest} />;
  const checkboxComponent = valuePropName ? <Checkbox {...rest} /> : <Checkbox.Group options={options} {...rest} />;

  // 使用 Record<string, JSX.Element> 类型来允许动态访问
  const map: Record<string, JSX.Element> = {
    input: inputComponent,
    select: <Select options={options} {...rest} />,
    radio: radioComponent,
    checkbox: checkboxComponent,
    switch: <Switch {...rest} />,
    textArea: <Input.TextArea {...rest} />,
    default: inputComponent
  };

  return map[type] || map.default;
};

export default FormItem;
