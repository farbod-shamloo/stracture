// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import PanelLayout from "../layout/PanelLayout";  // لی‌آوت پنل
import Dashboard from "../pages/panel/Dashboard";  // صفحه داشبورد
import Orders from "../pages/panel/Orders";  // صفحه کاربران
import ErrorLayout from "../layout/ErrorLayout"; // صفحه ارور
import LandingLayout from "../layout/LandingLayout";
import LoginLayout from "../layout/LoginLayout";
import Users from "../pages/panel/Users";
import Team from "../pages/panel/team";
import Files from "../pages/panel/files";
import Home from "../pages/Landing/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout/>,
    errorElement: <ErrorLayout />, // در صورت بروز ارور این صفحه نمایش داده می‌شود
    children:[
      {index: true, element: <Home />},
      // { path: "login", element: <LoginLayout /> },
    ]

  },
  {
    path: "/login",
    element: <LoginLayout/>,
    errorElement: <ErrorLayout />, // در صورت بروز ارور این صفحه نمایش داده می‌شود

  },
  {
    path: "/panel",
    element: <PanelLayout />,
    errorElement: <ErrorLayout />, // در صورت بروز ارور این صفحه نمایش داده می‌شود
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "files",
        element: <Files />,
      },
    ],
  },
]);

export default router;
