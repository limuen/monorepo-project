import { IColumnType } from "..";
import { AnyObject } from "@/types";
import { prettierCode } from "@/utils";
import { TableAttribute } from "../components/TableGlobalControl";

export interface TemplateTableAttribute extends TableAttribute {
  columns: IColumnType[];
  dataSource: AnyObject[];
}

export const getTableContent = (tableAttribute: TemplateTableAttribute) => {
  const { attribute } = tableAttribute;

  const tableAttributeString = Object.keys(attribute).reduce((cur: string, item: string) => {
    const key = item as keyof typeof attribute;
    return `${cur} ${item}="${attribute[key]}"`;
  }, "");
  return `<Table columns={columns} dataSource={dataSource} ${tableAttributeString} />`;
};

export const getTableColumnsDataSource = (tableAttribute: TemplateTableAttribute) => {
  const { columns, dataSource } = tableAttribute;
  const columnsString = `[${columns.map((item: any) => {
    return `{${Object.keys(item).reduce((all: string, key: string) => {
      if (["renderString", "title", "dataIndex", "width", "ellipsis"].includes(key) && item[key] !== undefined) {
        if ("renderString" === key) return `${all},render:${item[key]}`;
        if (["width", "ellipsis"].includes(key)) return `${all},${key}:${item[key]}`;
        return `${all}${all && ","}${key}:"${item[key]}"`;
      } else return all;
    }, "")}}`;
  })}]`;
  return `const columns = ${columnsString}
  const dataSource = ${JSON.stringify(dataSource)}`;
};

// 包含import export返回一个组件整体
export const getTableTemplate = (tableAttribute: TemplateTableAttribute) => {
  const { name } = tableAttribute;

  return prettierCode(`import React from 'react';
  import { Table,Tooltip } from 'antd';
  import dayjs from 'dayjs';

  interface ${name}Props {}
  
  export const ${name} = (props: ${name}Props) => {
    ${getTableColumnsDataSource(tableAttribute)}
    return ${getTableContent(tableAttribute)}
  };`);
};
