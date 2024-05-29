import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormInstance } from "antd/es/form";
import { FormColumn } from "..";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import FormItem from "@/components/FormItem";
import { shortUuid, uuid } from "@limuen/utils";
import { FormAttribute } from "./FormGlobalControl";

export interface FormBodyProps {
  form: FormInstance;
  columns: FormColumn[];
  setColumns: (columns: FormColumn[]) => void;
  formAttribute: FormAttribute;
  setCurrentFormIndex: (index: number) => void;
}

const FormBody: React.FC<FormBodyProps> = ({ form, columns, setColumns, formAttribute, setCurrentFormIndex }) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedColumns = Array.from(columns);
    const [removed] = updatedColumns.splice(sourceIndex, 1);
    updatedColumns.splice(destinationIndex, 0, removed);

    setColumns(updatedColumns);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formBodyDroppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Form form={form} className="my-form" labelCol={{ span: 3 }} {...formAttribute.attribute}>
                {columns.map((item, index) => (
                  <Draggable key={item.key} draggableId={item.key ?? ""} index={index}>
                    {provided => (
                      <div
                        className="hover-dashed-border form-hover-padding"
                        onClick={e => {
                          e.stopPropagation();
                          setCurrentFormIndex(index);
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Row style={{ alignItems: "baseline" }} gutter={10}>
                          <Col flex={1}>
                            <Form.Item label={item.label} name={item.name} valuePropName={item.valuePropName} rules={item.rules}>
                              <FormItem type={item.type} options={item.options} valuePropName={item.valuePropName} />
                            </Form.Item>
                          </Col>
                          <Col
                            flex="0 0 20px"
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                              e.stopPropagation();
                              const newColumns = columns.filter((_, colIndex) => colIndex !== index);
                              setColumns(newColumns);
                              setCurrentFormIndex(newColumns.length - 1);
                            }}
                          >
                            <CloseOutlined />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Draggable>
                ))}
              </Form>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        type="dashed"
        onClick={() => {
          const newColumn: FormColumn = {
            label: "默认",
            name: "default" + shortUuid(),
            type: "input", // 确保这是 FormItemType 类型
            options: [],
            key: uuid()
          };
          setColumns([...columns, newColumn]);
          setCurrentFormIndex(columns.length);
        }}
        style={{ width: "100%", marginTop: 5 }}
        icon={<PlusOutlined />}
      >
        添加
      </Button>
    </>
  );
};

export default FormBody;
