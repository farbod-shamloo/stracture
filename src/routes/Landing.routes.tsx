import { lazy } from "react";
import { withSuspense } from "../components/common/withSuspense";

const LandingLayout = lazy(() => import("../layout/LandingLayout"));
const Home = lazy(() => import("../pages/Landing/Home"));

const landingRoutes = {
  path: "/",
  element: withSuspense(LandingLayout),
  errorElement: <div>ارور بارگذاری</div>,
  children: [
    {
      index: true,
      element: withSuspense(Home),
    },
  ],
};

export default landingRoutes;
