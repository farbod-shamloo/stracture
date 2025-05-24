import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { getCurrentUsers } from "./services/Users";
import { UserProvider } from "./context/userContext";

import fa_IR from 'antd/es/locale/fa_IR';

import "./index.css"
import { ModalProvider } from "./context/ModalContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    getCurrentUsers();
  }, []);

  return (
    <ConfigProvider
      locale={fa_IR}
      direction="rtl"
      theme={{ token: { fontFamily: "IRANYekanXFaNum" } }}
    >
      <ModalProvider>
        <UserProvider>
          <RouterProvider router={router} />
          {/* اضافه کردن ToastContainer */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </UserProvider>
      </ModalProvider>
    </ConfigProvider>
  );
};

export default App;
