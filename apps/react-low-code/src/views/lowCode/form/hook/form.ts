import { useState } from "react";
import { FormColumn } from "..";
import { Form } from "antd";
import { uuid } from "@limuen/utils";
import { FormAttribute } from "../component/FormGlobalControl";

export const defaultFormColumns: FormColumn[] = [{ label: "标题", name: "title", type: "input", options: [], key: uuid() }];

export const defaultFormAttribute: FormAttribute = {
  name: "FormComponent",
  form: "form",
  exportName: "FormComponent",
  extension: ".tsx",
  attribute: {
    layout: "horizontal",
    labelAlign: "right",
    colon: true
  }
};

// 在modal模板需要用到form，复用代码封装了Form Hook
export const useFormHook = () => {
  const [form] = Form.useForm();

  // 表单项列表
  const [columns, setColumns] = useState<FormColumn[]>(defaultFormColumns);
  // 当前选中的表单项索引
  const [currentFormIndex, setCurrentFormIndex] = useState(-1);

  // 全局配置属性
  const [formAttribute, setFormAttribute] = useState<FormAttribute>(defaultFormAttribute);
  return {
    form,
    columns,
    setColumns,
    currentFormIndex,
    setCurrentFormIndex,
    formAttribute,
    setFormAttribute
  };
};
