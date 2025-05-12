import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import getCurrentUsers from "./services/user";
import { UserProvider } from "./context/userContext";

const App = () => {
  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <ConfigProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;
