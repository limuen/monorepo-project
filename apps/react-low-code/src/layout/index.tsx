import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

interface MenuItem {
  key: string;
  label: string;
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState(["/"]);

  const items: MenuItem[] = [
    {
      key: "/lowcode/table",
      label: "表格"
    },
    {
      key: "/lowcode/form",
      label: "表单"
    },
    {
      key: "/lowcode/modal",
      label: "弹窗"
    },
    {
      key: "/lowcode/component",
      label: "组件"
    },
    {
      key: "/dashboard",
      label: "首页"
    },
    {
      key: "https://github.com/limuen/monorepo-project",
      label: "GitHub"
    }
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key.startsWith("http")) {
      window.open(key, "_blank");
    } else {
      setSelectedKeys([key]);
      navigate(key);
    }
  };

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <div
        style={{
          minHeight: "100vh"
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={handleMenuClick}
          style={{
            width: 100,
            height: "100%",
            transition: "width .3s"
          }}
        />
      </div>
      <div
        style={{
          flex: "auto",
          boxSizing: "border-box",
          background: "#fff",
          minHeight: "100vh",
          transition: "width .3s"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
