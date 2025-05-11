import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import api from "./services/axios";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/v1/User/GetCurrentUser");
        console.log(res.data); 
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
