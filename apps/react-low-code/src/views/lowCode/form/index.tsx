import { Col, Row } from "antd";
import Operations from "@/components/Operations";
import { StorageNameMap } from "@/constants/storageNames";
import "./index.less";

const FormComponent: React.FC = () => {
  const saveTemplate = () => {};

  const previewCode = () => {
    return "代码预览";
  };

  const exportCode = () => {};

  const setTemplateList = () => {};

  return (
    <Row style={{ height: "100%" }}>
      <Col span={16} style={{ padding: "10px 15px 10px", borderRight: "1px solid #ccc" }}>
        <Operations
          type={StorageNameMap.form}
          saveTemplate={saveTemplate}
          previewCode={previewCode}
          exportCode={exportCode}
          setTemplateList={setTemplateList}
        />
      </Col>
    </Row>
  );
};

export default FormComponent;
