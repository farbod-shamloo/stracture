import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import getCurrentUsers from "./services/user";
import { UserProvider } from "./context/userContext";

import fa_IR from 'antd/es/locale/fa_IR';

import "./index.css"
import { ModalProvider } from "./context/ModalContext";


const App = () => {
  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <ConfigProvider locale={fa_IR}
    theme={{ token: { fontFamily: "IRANYekanXFaNum" } }}
    >
      <ModalProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      </ModalProvider>
    </ConfigProvider>
  );
};

export default App;
