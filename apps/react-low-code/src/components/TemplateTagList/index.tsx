import { Modal, Space, Tag } from "antd";
import { AnyObject } from "@/types";

interface TemplateTagListProps {
  templateId: string;
  templateList: AnyObject[];
  setTemplateList: (templateList: any[]) => void;
  templateClick: (template: any) => void;
}

const TemplateTagList: React.FC<TemplateTagListProps> = ({ templateId, templateList, setTemplateList, templateClick }) => {
  if (templateList.length) {
    return (
      <div>
        <Space style={{ marginBottom: 10 }}>
          <span>模板列表：</span>
          {templateList.map((item, index) => (
            <Tag
              key={item.templateId}
              color="blue"
              closable
              style={{ cursor: "pointer" }}
              onClose={() => {
                templateList.splice(index, 1);
                setTemplateList([...templateList]);
              }}
              onClick={() => {
                if (templateId === item.templateId) templateClick(item);
                else
                  Modal.confirm({
                    title: "模板替换",
                    content: "模板替换会丢失当前配置，是否确认替换？",
                    onOk: () => {
                      templateClick(item);
                    }
                  });
              }}
            >
              {item.templateName}
            </Tag>
          ))}
        </Space>
      </div>
    );
  }
  return null;
};

export default TemplateTagList;
