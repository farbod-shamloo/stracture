import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";

const PanelLayout = lazy(() => import("../layout/PanelLayout"));
const Dashboard = lazy(() => import("../pages/Panel/Dashboard"));
const Orders = lazy(() => import("../pages/Panel/Order/IndexOrders"));
const Users = lazy(() => import("../pages/Panel/Users"));
const Team = lazy(() => import("../pages/Panel/Team"));
const Files = lazy(() => import("../pages/Panel/Files"));
const ErrorLayout = lazy(() => import("../layout/ErrorLayout")); // اگه lazy نخواستی، می‌تونی مستقیم ایمپورت کنیP
const panelRoutes = {
  path: "/panel",
  element: withSuspense(PanelLayout),
  errorElement: withSuspense(ErrorLayout),
  children: [
    {
      path: "dashboard",
      element: withSuspense(Dashboard),
    },
    {
      path: "orders",
      element: withSuspense(Orders),
    },
    {
      path: "users",
      element: withSuspense(Users),
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
