import { ReactNode, useEffect } from "react";
import Selection from "@/components/Selection";
import { Form, Input } from "antd";
import GlobalControl from "@/components/GlobalControl";
import { BodyFormItem } from "@/views/lowCode/component/components/BodyFormItem";
import { BodyType } from "@/views/lowCode/component/components/ComponentGlobalControl";

export interface ModalAttribute {
  name: string;
  templateName?: string;
  exportName: string;
  extension: ".tsx" | ".jsx";
  attribute: {
    title: ReactNode;
    width?: string | number;
  };
  body: BodyType[];
}

interface ModalGlobalControlProps {
  modalAttribute: ModalAttribute;
  setModalAttribute: (columns: ModalAttribute) => void;
}

const ModalGlobalControl: React.FC<ModalGlobalControlProps> = ({ modalAttribute, setModalAttribute }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(modalAttribute);
  }, [modalAttribute]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={() => {
        setModalAttribute(form.getFieldsValue(true));
      }}
    >
      <Selection title="Modal 配置">
        <Form.Item label="标题" name={["attribute", "title"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="宽度"
          name={["attribute", "width"]}
          normalize={value => {
            if (Number(value)) {
              return Number(value);
            }
            return value;
          }}
        >
          <Input />
        </Form.Item>
        <BodyFormItem />
      </Selection>

      <GlobalControl />
    </Form>
  );
};

export default ModalGlobalControl;
