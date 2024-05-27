import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./index.less";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard_wrapper">
      <div className="banner">
        <div className="title">React-Low-Code</div>
        <div className="desciption">React低代码平台</div>
        <div className="btn-container">
          <NavLink to="/lowcode/table">
            <Button type="primary" size="large">
              开始上路
            </Button>
          </NavLink>
        </div>
      </div>

      <section className="part4">
        <div className="title">好好学习，天天向上</div>
        <div className="desciption">心愿：掌握资深前端的使用法则，成为更强的开发者</div>
        <div className="inner">
          <div className="base">
            <div className="base-container">React-Low-Code</div>
          </div>
          <div className="base">
            <div className="base-container">使用 Ant Design 组件</div>
          </div>
          <div className="base">
            <div className="base-container">仅需配置即可生成现有代码</div>
          </div>
        </div>
      </section>

      <footer>
        <div className="auther">@copyright Limuen</div>
        <div className="desc">React-Low-Code</div>
      </footer>
    </div>
  );
};

export default Dashboard;
