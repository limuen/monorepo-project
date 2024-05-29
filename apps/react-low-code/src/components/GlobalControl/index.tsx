import Selection from "../LowCodeUI/selection";
import { Form, Input, Select, Space } from "antd";
import { extensionList } from "@/views/lowCode/form/utils/constants";

const GlobalControl = () => {
  return (
    <Selection title="全局配置">
      <Form.Item label="组件名称" name="name" rules={[{ required: true }]}>
        <Input placeholder="组件名称" />
      </Form.Item>
      <Form.Item label="模板名称" name="templateName">
        <Input placeholder="模板名称" />
      </Form.Item>
      <Form.Item label="文件名称" required>
        <Space.Compact block>
          <Form.Item name="exportName" noStyle rules={[{ required: true, message: "请输入文件名" }]}>
            <Input style={{ width: "100%" }} placeholder="导出的文件名" />
          </Form.Item>
          <Form.Item name="extension" noStyle>
            <Select options={extensionList} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
    </Selection>
  );
};

export default GlobalControl;
