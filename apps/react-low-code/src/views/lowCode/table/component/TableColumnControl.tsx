import { useEffect } from "react";
import { IColumnType } from "../";
import { CloseOutlined } from "@ant-design/icons";
import Selection from "@/components/LowCodeUI/selection";
import { Button, Checkbox, Col, Form, Input, Popconfirm, Row, Select } from "antd";
import { AnyObject } from "@/types";
import { shortUuid } from "@limuen/utils";
import { renderTypeList } from "../utils/constants";
import { generateRender, getRenderTemplate } from "../utils/renderTemplate";

interface TableColumnControlProps {
  currentColumn: IColumnType;
  setCurrentColumn: (currentColumn?: IColumnType) => void;
  tableColumns: IColumnType[];
  setTableColumns: (tableColumns: IColumnType[]) => void;
  dataSource: AnyObject[];
  setDataSource: (dataSource: AnyObject[]) => void;
  addTableColumns: () => void;
}

const TableColumnControl: React.FC<TableColumnControlProps> = ({
  currentColumn,
  setCurrentColumn,
  tableColumns,
  setTableColumns,
  dataSource,
  setDataSource,
  addTableColumns
}) => {
  const [form] = Form.useForm();

  const defaultValue = {
    title: undefined,
    dataIndex: undefined,
    type: undefined,
    renderString: undefined,
    width: undefined,
    ellipsis: undefined
  };
  useEffect(() => {
    // 使用defaultValue不调用resetFields是因为每次修改dataSource时光标都被重置
    form.setFieldsValue({ ...defaultValue, ...currentColumn, dataSource });
  }, [currentColumn, dataSource]);

  const onValuesChange = (values: any) => {
    const { type, dataSource } = form.getFieldsValue(true);
    if (values.dataSource) {
      setDataSource(dataSource);
    } else {
      if (values.type) {
        const functionString = getRenderTemplate(type);
        form.setFieldsValue({
          renderString: functionString,
          render: generateRender(functionString)
        });
      }
      if (values.renderString) {
        try {
          const code = generateRender(values.renderString);
          code("a", {});
          form.setFieldsValue({
            render: code
          });
        } catch (e) {
          console.log(e);
        }
      }
      const index = tableColumns.findIndex((column: IColumnType) => column.dataIndex === currentColumn.dataIndex);
      const column = form.getFieldsValue(true);
      setCurrentColumn(column);
      tableColumns[index] = column;
      setTableColumns([...tableColumns]);
    }
  };

  return (
    <Selection title="字段配置">
      <Form form={form} onValuesChange={onValuesChange} labelCol={{ span: 6 }} key={currentColumn.id}>
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="dataIndex" name="dataIndex" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="格式化">
          <Form.Item name="type" noStyle>
            <Select options={renderTypeList} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Render"
          name="renderString"
          rules={[
            {
              validator(_, value) {
                try {
                  if (value) {
                    const code = generateRender(value);
                    code("a", {});
                  }
                } catch (e) {
                  return Promise.reject(new Error("Render书写格式有错！"));
                }
              }
            }
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="数据">
          <Form.List name="dataSource">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16
                }}
              >
                {subFields.map(subField => (
                  <div key={subField.key}>
                    <Form.Item noStyle name={[subField.name, currentColumn.dataIndex as string]}>
                      <Input style={{ width: "90%" }} />
                    </Form.Item>
                    <Popconfirm
                      title="删除数据"
                      description="会删除整行数据，你确定要删除吗?"
                      onConfirm={() => {
                        subOpt.remove(subField.name);
                      }}
                    >
                      <CloseOutlined style={{ marginLeft: 10 }} />
                    </Popconfirm>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    subOpt.add();
                    dataSource.push({ id: shortUuid() });
                    setDataSource([...dataSource]);
                  }}
                  block
                >
                  + 添加
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="宽度"
          name="width"
          normalize={value => {
            if (Number(value)) {
              return Number(value);
            }
            return value;
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ellipsis" name="ellipsis" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </Form>
      <Row gutter={20}>
        <Col flex={1}>
          <Button
            type="primary"
            block
            danger
            onClick={() => {
              const index = tableColumns.findIndex(column => column.dataIndex === currentColumn.dataIndex);
              tableColumns.splice(index, 1);
              setTableColumns([...tableColumns]);
              setCurrentColumn(undefined);
            }}
          >
            删除字段
          </Button>
        </Col>
        <Col flex={1}>
          <Button type="primary" block onClick={addTableColumns}>
            增加字段
          </Button>
        </Col>
      </Row>
    </Selection>
  );
};

export default TableColumnControl;
