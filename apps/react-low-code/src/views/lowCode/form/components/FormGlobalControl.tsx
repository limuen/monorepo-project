import { useEffect } from "react";
import Selection from "@/components/Selection";
import { Form, Input, Radio, Select, Switch } from "antd";
import GlobalControl from "@/components/GlobalControl";
import { labelAlignList, layoutList, variantList } from "../utils/constants";

export interface FormAttributeProperties {
  layout: "horizontal" | "vertical" | "inline";
  labelAlign: "left" | "right";
  colon: boolean;
  variant?: "outlined" | "borderless" | "filled";
}

export interface FormAttribute {
  name: string;
  templateName?: string;
  exportName: string;
  extension: ".tsx" | ".jsx";
  form: string;
  attribute: FormAttributeProperties;
}

interface FormGlobalControlProps {
  formAttribute: FormAttribute;
  setFormAttribute: (columns: FormAttribute) => void;
  hiddenGlobalControl?: boolean;
}

const FormGlobalControl: React.FC<FormGlobalControlProps> = ({ formAttribute, setFormAttribute, hiddenGlobalControl }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formAttribute);
  }, [formAttribute]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={() => {
        setFormAttribute(form.getFieldsValue());
      }}
    >
      <Selection title="Form 配置">
        <Form.Item label="布局" name={["attribute", "layout"]}>
          <Radio.Group options={layoutList} />
        </Form.Item>
        <Form.Item label="标签位置" name={["attribute", "labelAlign"]}>
          <Radio.Group options={labelAlignList} />
        </Form.Item>
        <Form.Item label="冒号" name={["attribute", "colon"]} valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Variant" name={["attribute", "variant"]}>
          <Select options={variantList} />
        </Form.Item>
        <Form.Item label="form" name="form" rules={[{ required: true }]}>
          <Input placeholder="Form.useForm() 返回的变量名" />
        </Form.Item>
      </Selection>

      {!hiddenGlobalControl && <GlobalControl />}
    </Form>
  );
};

export default FormGlobalControl;
