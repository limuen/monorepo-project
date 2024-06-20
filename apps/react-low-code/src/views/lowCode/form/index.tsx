import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { Rule } from "antd/es/form";
import Operations from "@/components/Operations";
import TemplateTagList from "@/components/TemplateTagList";
import { useUpdateEffect } from "ahooks";
import FormBody from "./components/FormBody";
import { FormAttribute } from "./components/FormGlobalControl";
import FormGlobalControl from "./components/FormGlobalControl";
import FormFieldControl from "./components/FormFieldControl";
import { useFormHook } from "./hook/useForm";
import { getFormTemplate } from "./utils/template";
import { downloadFile, uuid } from "@limuen/utils";
import { StorageNameMap } from "@/constants/storageNames";
import "./index.less";

export type FormItemType = "input" | "select" | "radio" | "checkbox" | "switch" | "textArea";

export interface FormColumn {
  label: string;
  name: string;
  key?: string;
  type?: FormItemType;
  options?: { label: React.ReactNode; value: string | number }[];
  rules?: Rule[];
  valuePropName?: string;
}

interface TemplateList extends FormAttribute {
  columns: FormColumn[];
  templateId: string;
}

const FormComponent: React.FC = () => {
  const { form, columns, setColumns, currentFormIndex, setCurrentFormIndex, formAttribute, setFormAttribute } = useFormHook();

  const [templateList, setTemplateList] = useState<TemplateList[]>([]);
  useEffect(() => {
    setTemplateList(JSON.parse(localStorage.getItem(StorageNameMap.form) || "[]"));
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(StorageNameMap.form, JSON.stringify(templateList));
  }, [templateList]);

  // 模板id，定位本地存储的模板
  const [templateId, setTemplateId] = useState(uuid());
  const saveTemplate = () => {
    if (!formAttribute.templateName) {
      formAttribute.templateName = "模板";
    }
    const currentTemplate = {
      templateId,
      columns,
      ...formAttribute
    };
    const index = templateList.findIndex((item: TemplateList) => item.templateId === templateId);
    if (index === -1) {
      templateList.push(currentTemplate);
    } else {
      templateList[index] = currentTemplate;
    }
    setTemplateList([...templateList]);
  };
  const previewCode = () => {
    return getFormTemplate({ ...formAttribute, columns });
  };
  const exportCode = () => {
    downloadFile(formAttribute.exportName + formAttribute.extension, getFormTemplate({ ...formAttribute, columns }));
  };

  // 回填模板数据
  const templateClick = (template: TemplateList) => {
    const { columns, templateId, ...formAttribute } = template;
    setCurrentFormIndex(-1);
    setTemplateId(templateId);
    setColumns(columns);
    setFormAttribute(formAttribute);
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col
        span={16}
        style={{ padding: "10px 15px 10px", borderRight: "1px solid #ccc" }}
        onClick={e => {
          if (e.currentTarget === e.target) {
            setCurrentFormIndex(-1);
          }
        }}
      >
        <Operations
          type={StorageNameMap.form}
          saveTemplate={saveTemplate}
          previewCode={previewCode}
          exportCode={exportCode}
          setTemplateList={setTemplateList}
        />
        <TemplateTagList
          templateId={templateId}
          templateList={templateList}
          setTemplateList={setTemplateList}
          templateClick={templateClick}
        />
        <FormBody
          form={form}
          columns={columns}
          setColumns={setColumns}
          formAttribute={formAttribute}
          setCurrentFormIndex={setCurrentFormIndex}
        />
        <Button
          type="primary"
          onClick={() => {
            form.validateFields();
            console.log(form.getFieldsValue());
          }}
          style={{ marginTop: 5, float: "right" }}
        >
          控制台打印表单数据
        </Button>
      </Col>
      <Col span={8} style={{ padding: "10px 15px 10px" }}>
        {currentFormIndex > -1 && (
          <FormFieldControl currentFormIndex={currentFormIndex} columns={columns} setColumns={setColumns} />
        )}
        {currentFormIndex === -1 && <FormGlobalControl formAttribute={formAttribute} setFormAttribute={setFormAttribute} />}
      </Col>
    </Row>
  );
};

export default FormComponent;
