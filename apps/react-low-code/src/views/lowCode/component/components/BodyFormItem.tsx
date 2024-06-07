import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { uuid } from "@limuen/utils";
import { bodyTypeList } from "../utils/constants";

export const BodyFormItem = () => {
  const form = Form.useFormInstance();
  const [typeList, setTypeList] = useState(bodyTypeList);
  const body = Form.useWatch("body", form);

  useEffect(() => {
    const hasForm = body?.some((item: { type: string }) => item.type === "form");
    const hasTable = body?.some((item: { type: string }) => item.type === "table");
    typeList[1].disabled = hasForm;
    typeList[2].disabled = hasTable;
    setTypeList(typeList);
  }, [body]);

  return (
    <Form.Item label="内容">
      <Form.List name="body">
        {(subFields, subOpt) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 16
            }}
          >
            {subFields.map(subField => {
              const { type, key } = form.getFieldValue(["body", subField.name]);
              return (
                <div key={key}>
                  <div>
                    <Form.Item name={[subField.name, "type"]} noStyle>
                      <Select options={typeList} style={{ width: "90%", marginRight: 10 }} />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </div>
                  {type === "string" && (
                    <Form.Item noStyle name={[subField.name, "content"]}>
                      <Input style={{ marginTop: 10 }} placeholder="value 字段" />
                    </Form.Item>
                  )}
                </div>
              );
            })}
            <Button
              type="dashed"
              onClick={() =>
                subOpt.add({
                  type: "string",
                  content: "Some contents...",
                  key: uuid()
                })
              }
              block
            >
              + 添加
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
};
