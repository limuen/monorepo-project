import { useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useUserStore } from "@/stores";
import { asyncLocalStorage } from "@/stores/modules/user";
import { Button, TimeSelect, Cell, TrendArrow } from "@nutui/nutui-react-taro";
import "./index.less";

export interface TimeType {
  value?: string;
  text?: string;
  [prop: string]: any;
}
export interface DateType {
  value?: string;
  text?: string;
  children?: TimeType[];
  [prop: string]: any;
}

export default function Index() {
  const [visible, setVisible] = useState(false);
  const setToken = useUserStore(state => state.setToken);

  useLoad(() => {
    console.log("Page loaded.", process.env.TARO_ENV, process.env.TARO_APP_ID, process.env.NODE_ENV, Taro.getEnv());
    console.log("Page loaded.");
  });

  const handleSetToken = () => {
    setToken("1234567890");
  };

  const handleDeleteToken = () => {
    asyncLocalStorage.removeItem("limuen-user");
    setToken("");
  };

  const marginStyle = { margin: 8 };

  const options = [
    {
      value: "20230520",
      text: "5月20日(今天)",
      children: [
        { value: "09", text: "09:00-10:00" },
        { value: "10", text: "10:00-11:00" },
        { value: "11", text: "11:00-12:00" }
      ]
    },
    {
      value: "20230521",
      text: "5月21日(星期三)",
      children: [
        { value: "09", text: "09:00-10:00" },
        { value: "10", text: "10:00-11:00" }
      ]
    }
  ];
  const handleClick = () => {
    setVisible(true);
  };
  const handleSelect = (value: DateType[]) => {
    setVisible(false);
    console.log(`您选择了: ${JSON.stringify(value)}`);
  };
  const handleDateChange = (date: TimeType, value: DateType[]) => {
    console.log(date, value);
  };
  const handleTimeChange = (time: TimeType, value: DateType[]) => {
    console.log(time, value);
  };

  return (
    <View className="index">
      <Text className="index-text">Hello world!</Text>
      <View>
        <Button type="primary" onClick={handleSetToken} style={marginStyle}>
          setToken
        </Button>
        <Button onClick={handleDeleteToken} style={marginStyle}>
          deleteToken
        </Button>
      </View>
      <View>token: {useUserStore().token}</View>
      <Cell title="请选择配送时间" onClick={handleClick} />
      <TimeSelect
        visible={visible}
        options={options}
        style={{
          height: "auto"
        }}
        onSelect={handleSelect}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />

      <Cell>
        <TrendArrow sync={false} value={1} />
        <TrendArrow sync={false} value={-0.2535} />
      </Cell>
    </View>
  );
}
