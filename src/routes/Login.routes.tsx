import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";
import  ErrorLayout from "../layout/ErrorLayout";

const LoginLayout = lazy(() => import("../layout/LoginLayout"));

const loginRoutes = {
  path: "/login",
  element: withSuspense(LoginLayout),
  errorElement: <ErrorLayout />,
};

export default loginRoutes;


