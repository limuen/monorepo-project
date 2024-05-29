import { FormColumn } from "..";
import { prettierCode } from "@/utils";
import { FormAttribute } from "../component/FormGlobalControl";

export interface TemplateFormAttribute extends FormAttribute {
  columns: FormColumn[];
}

// 定义在Modal里面使用的form
export const getFormHookName = (formAttribute: TemplateFormAttribute) => {
  const { form } = formAttribute;
  return `const [${form}] = Form.useForm();`;
};

// 返回Form ReactNode，可以作为Modal body插入弹窗里面
export const getFormContent = (formAttribute: TemplateFormAttribute) => {
  const { form, attribute, columns } = formAttribute;

  const formAttributeString = Object.keys(attribute).reduce((cur: string, item: string) => {
    const key = item as keyof typeof attribute;
    if (item === "colon") return `${cur} ${attribute[item] === false ? "colon={false}" : ""}`;
    return `${cur} ${item}="${attribute[key]}"`;
  }, "");

  const inputMap: Record<string, string> = {
    input: "Input",
    select: "Select",
    radio: "Radio.Group",
    checkbox: "Checkbox.Group",
    switch: "Switch",
    textArea: "Input.TextArea"
  };
  const formItemString = columns.map((column: any) => {
    const { type, options, ...formItemAttribute } = column;
    const formItemAttributeString = Object.keys(formItemAttribute).reduce((cur: string, attribute: string) => {
      const value = column[attribute];
      if (attribute === "valuePropName" && !value?.length) return cur;
      if (["rules"].includes(attribute)) return `${cur} ${attribute}={${JSON.stringify(value)}}`;
      return `${cur} ${attribute}="${value}"`;
    }, "");
    let componentName = inputMap[type];
    if (formItemAttribute.valuePropName?.length) {
      if (type === "radio") {
        componentName = "Radio";
      }
      if (type === "checkbox") {
        componentName = "Checkbox";
      }
    }
    return `<Form.Item ${formItemAttributeString}>
    <${componentName} ${
      !formItemAttribute.valuePropName?.length && ["select", "radio", "checkbox"].includes(type)
        ? `options={${JSON.stringify(options)}}`
        : ""
    }/>
  </Form.Item>`;
  });
  return `<Form form={${form}} ${formAttributeString}>
  ${formItemString.join("")}</Form>`;
};

// 包含import export返回一个组件整体
export const getFormTemplate = (formAttribute: TemplateFormAttribute) => {
  const { name } = formAttribute;

  return prettierCode(`import React from 'react';
  import { Form, Checkbox, Input, Radio, Select, Switch } from 'antd';

  interface ${name}Props {}

  export const ${name} = (props: ${name}Props) => {
    ${getFormHookName(formAttribute)}

    return ${getFormContent(formAttribute)}
  };`);
};
