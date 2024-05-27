import useScreenInfo from "@/hooks/useScreenInfo";
import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { Cell, Checkbox, Button, Radio, Rate, Switch, CircleProgress, Price, CalendarCard } from "@nutui/nutui-react-taro";
import { useEffect, useState } from "react";

const date = new Date("2024-04-25");

export default function Test() {
  const { statusBarHeight, windowHeight, HeaderHeight } = useScreenInfo();
  const [checked] = useState(false);
  useLoad(() => {
    console.log("Page loaded.", process.env.TARO_ENV, process.env.TARO_APP_ID, Taro.getEnv());
  });

  const onChange = (val: any) => {
    console.log(val);
  };

  useEffect(() => {
    console.log("状态栏高度:", statusBarHeight);
    console.log("屏幕高度:", windowHeight);
    console.log("头部高度:", HeaderHeight);
  }, [statusBarHeight, windowHeight, HeaderHeight]);

  return (
    <View className="index">
      <Cell>
        <Price price={0} size="large" thousands />
      </Cell>
      <CalendarCard defaultValue={date} onChange={onChange} />
      <Button
        type="primary"
        style={{
          margin: 8,
          background: `var(--nutui-color-primary)`,
          borderColor: `var(--nutui-color-primary)`
        }}
      >
        Primary
      </Button>
      <Cell className="nut-cell">
        <Checkbox className="test" label="复选框" defaultChecked={checked} />
      </Cell>
      <Cell>
        <Rate defaultValue={3} />
      </Cell>
      <Cell>
        <Switch defaultChecked />
      </Cell>
      <Cell>
        <Radio defaultChecked>选项1</Radio>
      </Cell>
      <Cell>
        <CircleProgress percent={60}>60%</CircleProgress>
      </Cell>
      <Cell className="nut-cell">
        <Checkbox
          style={{ marginInlineEnd: "8px" }}
          shape="button"
          className="test"
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div>复选框</div>
              <div style={{ color: "gray" }}>描述信息</div>
            </div>
          }
          defaultChecked={!checked}
        />
        <Checkbox
          shape="button"
          className="test"
          disabled
          style={{ marginInlineEnd: "8px" }}
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div>复选框</div>
              <div>描述信息1</div>
            </div>
          }
          defaultChecked={checked}
        />
        <Checkbox
          shape="button"
          className="test"
          style={{ marginInlineEnd: "8px" }}
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div>复选框</div>
              <div>描述信息1</div>
            </div>
          }
          defaultChecked={checked}
        />
        <Checkbox
          shape="button"
          className="test"
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div>复选框</div>
              <div>描述信息1</div>
            </div>
          }
          defaultChecked={checked}
        />
      </Cell>
    </View>
  );
}
