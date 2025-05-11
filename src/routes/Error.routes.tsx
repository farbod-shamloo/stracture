import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";


const ErrorLayout = lazy(() => import("../layout/ErrorLayout"));

const errorRoutes = {
  path: "/*",
  element: withSuspense(ErrorLayout),

};

export default errorRoutes;
