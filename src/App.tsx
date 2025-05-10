// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import router from "./routes/router";
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from "antd";

const App = () => {
  return (
    <ConfigProvider
     
      >
     <RouterProvider router={router} />
  </ConfigProvider>
   
  );
};

export default App;
