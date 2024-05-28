import React, { useRef } from "react";
import { Button, Space, Upload } from "antd";
import { StorageName } from "@/constants/storageNames";
import { downloadFile } from "@/utils";
import { CodeDrawer, CodeDrawerRef } from "../CodeDrawer";

interface OperationsProps {
  type: StorageName;
  saveTemplate: () => void;
  previewCode: () => string;
  exportCode: () => void;
  setTemplateList: (templateList: any[]) => void;
}

const Operations: React.FC<OperationsProps> = ({ type, saveTemplate, previewCode, exportCode, setTemplateList }) => {
  const codeDrawerRef = useRef<CodeDrawerRef>(null);

  const handlePreview = () => {
    if (codeDrawerRef.current) {
      codeDrawerRef.current?.open(previewCode());
    }
  };

  const handleExportTemplate = () => {
    const template = localStorage.getItem(type) || "[]";
    downloadFile(`${type}Config.json`, template);
  };

  const handleUpload = async (file: File) => {
    const text = await file.text();
    localStorage.setItem(type, text);
    setTemplateList(JSON.parse(text));
    return false;
  };

  return (
    <Space style={{ marginBottom: 10 }}>
      <Button type="primary" onClick={saveTemplate}>
        保存
      </Button>
      <Button type="primary" onClick={handlePreview}>
        预览
      </Button>
      <Button type="primary" onClick={exportCode}>
        导出代码
      </Button>
      <Button type="primary" onClick={handleExportTemplate}>
        导出模板
      </Button>
      <Upload accept=".json" showUploadList={false} beforeUpload={handleUpload}>
        <Button type="primary">导入模板</Button>
      </Upload>
      <CodeDrawer ref={codeDrawerRef} />
    </Space>
  );
};

export default Operations;
