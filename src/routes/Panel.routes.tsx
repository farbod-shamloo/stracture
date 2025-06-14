import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";

const PanelLayout = lazy(() => import("../layout/PanelLayout"));
const Users = lazy(() => import("../pages/panel/Users"));
const Panel = lazy(() => import("../pages/Panel/indexPanel"));
const Orders = lazy(() => import("../pages/Panel/Order/IndexOrders"));
const Dash = lazy(() => import("../pages/panel/Dash"));
const Team = lazy(() => import("../pages/Panel/Team"));
const Files = lazy(() => import("../pages/Panel/Files"));
const ErrorLayout = lazy(() => import("../layout/ErrorLayout"));
const AddEditUser = lazy (() => import("../pages/panel/users/AddEditUser")) 
const panelRoutes = {
  path: "/panel",
  element: withSuspense(PanelLayout),
  errorElement: withSuspense(ErrorLayout),
  children: [
      {
      path: "",
      element: withSuspense(Panel),
    },
    {
      path: "users",
      element: withSuspense(Users),
    },
    {
      path: "users/add",
      element: withSuspense(AddEditUser), 
    },
    {
      path: "users/edit/:id",
      element: withSuspense(AddEditUser), 
    },
    {
      path: "orders",
      element: withSuspense(Orders),
    },
    {
      path: "dash",
      element: withSuspense(Dash),
    },
    {
      path: "team",
      element: withSuspense(Team),
    },
    {
      path: "files",
      element: withSuspense(Files),
    },
  ],
};

export default panelRoutes;
