import { useEffect } from "react";
import { Button, Checkbox, Form, Input, TablePaginationConfig } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Selection from "@/components/Selection";
import GlobalControl from "@/components/GlobalControl";
import { AnyObject } from "@/types";
import { shortUuid } from "@limuen/utils";

export interface TableAttribute {
  name: string;
  templateName?: string;
  exportName: string;
  extension: ".tsx" | ".jsx";
  attribute: {
    rowKey?: string;
    pagination?: false | TablePaginationConfig;
  };
}

interface TableGlobalControlProps {
  tableAttribute: TableAttribute;
  setTableAttribute: (columns: TableAttribute) => void;
  dataSource: AnyObject[];
  setDataSource: (dataSource: AnyObject[]) => void;
  hiddenGlobalControl?: boolean;
}

const TableGlobalControl: React.FC<TableGlobalControlProps> = ({
  tableAttribute,
  setTableAttribute,
  dataSource,
  setDataSource,
  hiddenGlobalControl
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...tableAttribute,
      attribute: {
        ...tableAttribute.attribute,
        pagination: tableAttribute.attribute.pagination !== undefined ? tableAttribute.attribute.pagination : {}
      },
      dataSource: dataSource.map(item => {
        if (typeof item === "string") {
          return item;
        } else {
          return JSON.stringify(item);
        }
      })
    });
  }, [tableAttribute, dataSource]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={values => {
        if (values.dataSource) {
          const dataSource = form.getFieldValue("dataSource").map((item: string) => {
            try {
              const data = JSON.parse(item);
              if (!data.id) data.id = shortUuid();
              return data;
            } catch {
              return item;
            }
          });
          setDataSource(dataSource);
        } else {
          setTableAttribute(form.getFieldsValue(true));
        }
      }}
    >
      <Selection title="Table 配置">
        <Form.Item label="rowKey" name={["attribute", "rowKey"]}>
          <Input />
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
                    <Form.Item
                      noStyle
                      name={[subField.name]}
                      rules={[
                        {
                          validator(_, value) {
                            try {
                              JSON.parse(value);
                            } catch {
                              return Promise.reject(new Error("对象书写格式有错！"));
                            }
                          }
                        }
                      ]}
                    >
                      <Input.TextArea rows={3} placeholder="对象字符串" style={{ width: "90%" }} />
                    </Form.Item>
                    <CloseOutlined
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    subOpt.add({ id: shortUuid() });
                  }}
                  block
                >
                  + 添加
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="分页" name={["attribute", "pagination"]} valuePropName="checked">
          <Checkbox checked={!!tableAttribute.attribute.pagination} />
        </Form.Item>
      </Selection>

      {!hiddenGlobalControl && <GlobalControl />}
    </Form>
  );
};

export default TableGlobalControl;
