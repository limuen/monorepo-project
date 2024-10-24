import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { logInfo } from "@limuen/utils/console";
import { useUserStore } from "@limuen/stores";

function App() {
  const [count, setCount] = useState(0);
  const { token, setToken } = useUserStore();
  useEffect(() => {
    setToken({ expireTime: 0, login: false, token: "" });
  }, []);
  logInfo("count", count, token);

  const handleSetCount = () => {
    setCount(count + 1);
    setToken({ expireTime: 0, login: false, token: "token12312312312" });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleSetCount}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>{token?.token}</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
