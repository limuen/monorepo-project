import { useEffect } from "react";
import { FormColumn } from "../";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import Selection from "@/components/Selection";
import Ellipsis from "@/components/Ellipsis";
import { FormTypeList } from "../utils/constants";

interface FormFieldControlProps {
  currentFormIndex: number;
  columns: FormColumn[];
  setColumns: (columns: FormColumn[]) => void;
}

const FormFieldControl: React.FC<FormFieldControlProps> = ({ currentFormIndex, columns, setColumns }) => {
  const [form] = Form.useForm();
  const type = Form.useWatch("type", { form: form });

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...columns[currentFormIndex] });
  }, [currentFormIndex]);

  return (
    <Selection title="字段配置">
      <Form
        form={form}
        onValuesChange={values => {
          const column = form.getFieldsValue(true);
          if (values.type) {
            if (values.type === "switch") {
              column.valuePropName = "checked";
            } else {
              column.valuePropName = undefined;
            }
          }
          columns[currentFormIndex] = column;
          setColumns([...columns]);
        }}
        labelCol={{ span: 4 }}
        key={columns?.[currentFormIndex]?.key}
      >
        <Form.Item label="标签" name="label" rules={[{ required: true }]}>
          <Input placeholder="FormItem 的 label 标签" />
        </Form.Item>
        <Form.Item label="字段名" name="name" rules={[{ required: true }]}>
          <Input placeholder="FormItem 的 title 标签" />
        </Form.Item>
        <Form.Item label="组件类型" name="type">
          <Select options={FormTypeList} />
        </Form.Item>
        {["select", "radio", "checkbox"].includes(type) && (
          <Form.Item label="选项">
            <Form.List name="options">
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16
                  }}
                >
                  {subFields.map(subField => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, "label"]}>
                        <Input placeholder="label 字段" />
                      </Form.Item>
                      <Form.Item noStyle name={[subField.name, "value"]}>
                        <Input placeholder="value 字段" />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => subOpt.add({ label: "", value: "" })} block>
                    + 添加
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        )}
        <Form.Item label="校验规则">
          <Space direction="vertical" style={{ marginTop: 5, width: "100%" }}>
            <Form.Item noStyle name={["rules", 0, "required"]} valuePropName="checked">
              <Checkbox>是否必填</Checkbox>
            </Form.Item>
            <Form.Item noStyle name={["rules", 0, "message"]}>
              <Input placeholder="错误信息" />
            </Form.Item>
            <Form.Item noStyle name={["rules", 0, "pattern"]}>
              <Input placeholder="正则表达式，不需要前后加//" />
            </Form.Item>
          </Space>
        </Form.Item>
        {["switch", "radio", "checkbox"].includes(type) && (
          <Form.Item
            name="valuePropName"
            labelCol={{ span: 8 }}
            labelAlign="left"
            label={<Ellipsis>valuePropName</Ellipsis>}
            tooltip="当你希望开关、单选、多选返回boolean类型的值时，需要勾选此选项"
          >
            <Checkbox.Group options={[{ value: "checked", label: "" }]} disabled={type === "switch"} />
          </Form.Item>
        )}
      </Form>
    </Selection>
  );
};

export default FormFieldControl;
