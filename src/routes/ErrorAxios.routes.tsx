import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";


const ErrorAxiosLayout = lazy(() => import("../layout/ErrorLayout"));

const errorAxios = {
  path: "/error",
  element: withSuspense(ErrorAxiosLayout),

};

export default errorAxios;
