import { useEffect, useState } from "react";
import { ColumnType } from "antd/lib/table";
import { useUpdateEffect } from "ahooks";
import { Col, Row } from "antd";
import Operations from "@/components/Operations";
import TemplateTagList from "@/components/TemplateTagList";
import { StorageNameMap } from "@/constants/storageNames";
import { AnyObject } from "@/types";
import { downloadFile, uuid } from "@limuen/utils";
import { $eval } from "@/utils/eval";
import TableBody from "./components/TableBody";
import TableColumnControl from "./components/TableColumnControl";
import TableGlobalControl from "./components/TableGlobalControl";
import { TableAttribute } from "./components/TableGlobalControl";

import { useTableHook } from "./hook/useTable";
import { getTableTemplate } from "./utils/template";

export interface IColumnType extends ColumnType<any> {
  id?: string;
}

interface TemplateList extends TableAttribute {
  columns: IColumnType[];
  dataSource: AnyObject[];
  templateId: string;
}

/** TO DO
 * 1. 字段支持增删、拖拽 Done
 * 2. 字段支持数据编写，mock数据人名地点 Mock 未完成
 * 3. 字段支持map映射 Done
 *  */

const TableComponent = () => {
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

  const [templateList, setTemplateList] = useState<TemplateList[]>([]);
  useEffect(() => {
    setTemplateList(JSON.parse(localStorage.getItem(StorageNameMap.table) || "[]"));
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(StorageNameMap.table, JSON.stringify(templateList));
  }, [templateList]);

  // 模板id，定位本地存储的模板
  const [templateId, setTemplateId] = useState(uuid());
  const saveTemplate = () => {
    if (!tableAttribute.templateName) {
      tableAttribute.templateName = "模板";
    }
    const currentTemplate = {
      templateId,
      dataSource,
      columns: tableColumns.map((item: any) => {
        const column: AnyObject = {};
        Object.keys(item).forEach((key: string) => {
          if (["render"].includes(key)) {
            column[key] = item[key].toString();
          } else {
            column[key] = item[key];
          }
        });
        return column;
      }),
      ...tableAttribute
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
    return getTableTemplate({
      ...tableAttribute,
      dataSource,
      columns: tableColumns
    });
  };
  const exportCode = () => {
    downloadFile(
      tableAttribute.exportName + tableAttribute.extension,
      getTableTemplate({ ...tableAttribute, dataSource, columns: tableColumns })
    );
  };

  // 回填模板数据
  const templateClick = (template: TemplateList) => {
    const { columns, dataSource, templateId, ...tableAttribute } = template;
    setCurrentColumn(undefined);
    setDataSource(dataSource);
    setTemplateId(templateId);
    setTableColumns(
      columns.map((item: any) => {
        item.render = $eval(item.render);
        return item;
      })
    );
    setTableAttribute(tableAttribute);
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col
        span={16}
        style={{ padding: "10px 15px 10px", borderRight: "1px solid #ccc" }}
        onClick={e => {
          if (e.currentTarget === e.target) {
            setCurrentColumn(undefined);
          }
        }}
      >
        <Operations
          type={StorageNameMap.table}
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
        <TableBody
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          dataSource={dataSource}
          tableDemoColumns={tableDemoColumns}
          addTableColumns={addTableColumns}
          tableAttribute={tableAttribute}
        />
      </Col>
      <Col span={8} style={{ padding: "10px 15px 10px" }}>
        {currentColumn && (
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
        {!currentColumn && (
          <TableGlobalControl
            tableAttribute={tableAttribute}
            setTableAttribute={setTableAttribute}
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        )}
      </Col>
    </Row>
  );
};

export default TableComponent;
