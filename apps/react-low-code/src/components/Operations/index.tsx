import { useRef } from "react";
import { Button, Space, Upload } from "antd";
import { StorageName } from "@/constants/storageNames";
import { downloadFile } from "@limuen/utils";
import CodeDrawer from "../CodeDrawer";

interface OperationsProps {
  type: StorageName;
  saveTemplate: () => void;
  previewCode: () => string;
  exportCode: () => void;
  setTemplateList: (templateList: any[]) => void;
}

const Operations: React.FC<OperationsProps> = ({ type, saveTemplate, previewCode, exportCode, setTemplateList }) => {
  const codeDrawerRef: any = useRef();

  return (
    <Space style={{ marginBottom: 10 }}>
      <Button type="primary" onClick={saveTemplate}>
        保存
      </Button>
      <Button type="primary" onClick={() => codeDrawerRef.current?.open(previewCode())}>
        预览
      </Button>
      <Button type="primary" onClick={exportCode}>
        导出代码
      </Button>
      <Button type="primary" onClick={() => downloadFile(`${type}Config.json`, localStorage.getItem(type) || "[]")}>
        导出模板
      </Button>
      <Upload
        accept=".json"
        showUploadList={false}
        beforeUpload={file => {
          file.text().then(res => {
            localStorage.setItem(type, res);
            setTemplateList(JSON.parse(res));
          });
          return false;
        }}
      >
        <Button type="primary">导入模板</Button>
      </Upload>
      <CodeDrawer ref={codeDrawerRef} />
    </Space>
  );
};

export default Operations;
