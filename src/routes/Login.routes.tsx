import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";

const LoginLayout = lazy(() => import("../layout/LoginLayout"));

const loginRoutes = {
  path: "/login",
  element: withSuspense(LoginLayout),
  errorElement: <div>ارور بارگذاری</div>,
};

export default loginRoutes;
