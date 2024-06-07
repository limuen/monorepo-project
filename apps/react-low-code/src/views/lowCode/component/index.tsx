import { useEffect, useRef, useState } from "react";
import { ColumnType } from "antd/lib/table";
import { useUpdateEffect } from "ahooks";
import { Col, Row } from "antd";
import { useFormHook } from "@/views/lowCode/form/hook/form";
import Operations from "@/components/Operations";
import TemplateTagList from "@/components/TemplateTagList";
import { StorageNameMap } from "@/constants/storageNames";
import { AnyObject } from "@/types";
import { downloadFile, uuid } from "@limuen/utils";
import ComponentBody from "./components/ComponentBody";
import { ComponentGlobalControl, ComponentAttribute, BodyType } from "./components/ComponentGlobalControl";
import { getComponentTemplate } from "./utils/template";
import { FormColumn } from "../form";
import FormFieldControl from "../form/components/FormFieldControl";
import FormGlobalControl from "../form/components/FormGlobalControl";
import { FormAttribute } from "../form/components/FormGlobalControl";
import TableColumnControl from "../table/components/TableColumnControl";
import TableGlobalControl from "../table/components/TableGlobalControl";
import { TableAttribute } from "../table/components/TableGlobalControl";
import { useTableHook } from "../table/hook/table";
import "./index.less";

interface TemplateList extends ComponentAttribute {
  templateId: string;
  columns: FormColumn[];
  formAttribute: FormAttribute;
  tableAttribute: TableAttribute;
  tableColumns: ColumnType<any>[];
  dataSource: AnyObject[];
}

const Component: React.FC = () => {
  const formBodyRef: any = useRef();
  const tableBodyRef: any = useRef();

  // form body hook
  const { form, columns, setColumns, currentFormIndex, setCurrentFormIndex, formAttribute, setFormAttribute } = useFormHook();
  const [isForm, setIsForm] = useState(false);

  // table body hook
  const {
    tableColumns,
    setTableColumns,
    dataSource,
    setDataSource,
    currentColumn,
    setCurrentColumn,
    tableAttribute,
    setTableAttribute,
    tableDemoColumns,
    addTableColumns
  } = useTableHook();
  const [isTable, setIsTable] = useState(false);

  // 全局配置属性
  const [componentAttribute, setComponentAttribute] = useState<ComponentAttribute>({
    name: "ComponentName",
    exportName: "ComponentName",
    extension: ".tsx",
    attribute: {
      title: "标题",
      width: 750
    },
    body: [
      { type: "string", content: "Some contents...", key: uuid() },
      { type: "form", content: "Some contents...", key: uuid() },
      { type: "table", content: "Some contents...", key: uuid() }
    ]
  });
  const setBody = (body: BodyType[]) => {
    setComponentAttribute({ ...componentAttribute, body });
  };

  const [templateList, setTemplateList] = useState<TemplateList[]>([]);
  useEffect(() => {
    setTemplateList(JSON.parse(localStorage.getItem(StorageNameMap.component) || "[]"));
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(StorageNameMap.component, JSON.stringify(templateList));
  }, [templateList]);

  // 模板id，定位本地存储的模板
  const [templateId, setTemplateId] = useState(uuid());
  const saveTemplate = () => {
    if (!componentAttribute.templateName) {
      componentAttribute.templateName = "模板";
    }
    const currentTemplate: TemplateList = {
      templateId,
      columns,
      formAttribute,
      tableAttribute,
      tableColumns,
      dataSource,
      ...componentAttribute
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
    return getComponentTemplate(
      componentAttribute,
      {
        ...formAttribute,
        columns
      },
      {
        ...tableAttribute,
        dataSource,
        columns: tableColumns
      }
    );
  };
  const exportCode = () => {
    downloadFile(
      componentAttribute.exportName + componentAttribute.extension,
      getComponentTemplate(
        componentAttribute,
        {
          ...formAttribute,
          columns
        },
        {
          ...tableAttribute,
          dataSource,
          columns: tableColumns
        }
      )
    );
  };

  // 回填模板数据
  const templateClick = (template: TemplateList) => {
    const { templateId, columns, formAttribute, tableAttribute, tableColumns, dataSource, ...componentAttribute } = template;
    setTemplateId(templateId);
    setComponentAttribute(componentAttribute);
    setColumns(columns);
    setFormAttribute(formAttribute);
    setTableAttribute(tableAttribute);
    setTableColumns(tableColumns);
    setDataSource(dataSource);
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col
        ref={ref => {
          ref?.addEventListener(
            "click",
            e => {
              setIsForm(formBodyRef?.current?.contains(e.target));
              setIsTable(tableBodyRef?.current?.contains(e.target));
            },
            true
          );
        }}
        span={16}
        style={{ padding: "10px 15px 10px", borderRight: "1px solid #ccc" }}
        className="my-modal-container"
      >
        <Operations
          type={StorageNameMap.component}
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
        <ComponentBody
          formBodyRef={formBodyRef}
          tableBodyRef={tableBodyRef}
          body={componentAttribute.body}
          setBody={setBody}
          form={form}
          columns={columns}
          setColumns={setColumns}
          formAttribute={formAttribute}
          setCurrentFormIndex={setCurrentFormIndex}
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          dataSource={dataSource}
          tableDemoColumns={tableDemoColumns}
          addTableColumns={addTableColumns}
          tableAttribute={tableAttribute}
          setCurrentColumn={setCurrentColumn}
        />
      </Col>
      <Col span={8} style={{ padding: "10px 15px 10px" }}>
        {!isForm && !isTable && (
          <ComponentGlobalControl componentAttribute={componentAttribute} setComponentAttribute={setComponentAttribute} />
        )}
        {isForm && currentFormIndex > -1 && (
          <FormFieldControl currentFormIndex={currentFormIndex} columns={columns} setColumns={setColumns} />
        )}
        {isForm && currentFormIndex === -1 && (
          <FormGlobalControl formAttribute={formAttribute} setFormAttribute={setFormAttribute} hiddenGlobalControl />
        )}
        {isTable && currentColumn && (
          <TableColumnControl
            currentColumn={currentColumn}
            setCurrentColumn={setCurrentColumn}
            tableColumns={tableColumns}
            setTableColumns={setTableColumns}
            dataSource={dataSource}
            setDataSource={setDataSource}
            addTableColumns={addTableColumns}
          />
        )}
        {isTable && !currentColumn && (
          <TableGlobalControl
            tableAttribute={tableAttribute}
            setTableAttribute={setTableAttribute}
            dataSource={dataSource}
            setDataSource={setDataSource}
            hiddenGlobalControl
          />
        )}
      </Col>
    </Row>
  );
};

export default Component;
