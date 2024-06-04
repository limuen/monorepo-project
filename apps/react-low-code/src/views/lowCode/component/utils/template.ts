import { prettierCode } from "@/utils";
import { TemplateFormAttribute, getFormContent, getFormHookName } from "@/views/lowCode/form/utils/template";
import { TemplateTableAttribute, getTableColumnsDataSource, getTableContent } from "@/views/lowCode/table/utils/template";
import { BodyType, ComponentAttribute } from "../component/ComponentGlobalControl";

export const generateBody = (body: BodyType[], formAttribute: TemplateFormAttribute, tableAttribute: TemplateTableAttribute) => {
  return body.reduce((result, item) => {
    if (item.type === "form") {
      return `${result}${getFormContent(formAttribute)}`;
    }
    if (item.type === "table") {
      return `${result}${getTableContent(tableAttribute)}`;
    }
    return `${result}<div>${item.content}</div>`;
  }, "");
};

export const getBodyFormName = (body: BodyType[], formAttribute: TemplateFormAttribute) => {
  if (body.some(item => item.type === "form")) return getFormHookName(formAttribute);
  return "";
};

export const getBodyTableColumnsDataSource = (body: BodyType[], tableAttribute: TemplateTableAttribute) => {
  if (body.some(item => item.type === "table")) return getTableColumnsDataSource(tableAttribute);
  return "";
};

export const getComponentTemplate = (
  componentAttribute: ComponentAttribute,
  formAttribute: TemplateFormAttribute,
  tableAttribute: TemplateTableAttribute
) => {
  const { name, body } = componentAttribute;

  return prettierCode(`import React from 'react';
  import { Table,Tooltip, Form, Checkbox, Input, Radio, Select, Switch } from 'antd';
  
  interface ${name}Props {}
  
  export const ${name} = (props: ${name}Props) => {
    ${getBodyFormName(body, formAttribute)}
    ${getBodyTableColumnsDataSource(body, tableAttribute)}

    return <>${generateBody(body, formAttribute, tableAttribute)}</>
  };`);
};
