import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import getCurrentUsers from "./services/user";
import { UserProvider } from "./context/userContext";

import fa_IR from 'antd/es/locale/fa_IR';


const App = () => {
  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <ConfigProvider locale={fa_IR}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;
