import { RouterProvider } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import router from "./router";

export function App() {
  return (
    <ConfigProvider locale={zhCN} prefixCls="ant-prefix">
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
