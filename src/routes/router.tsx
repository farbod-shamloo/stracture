import { createBrowserRouter } from "react-router-dom";
import landingRoutes from "../routes/Landing.routes";
import loginRoutes from "../routes/Login.routes";
import panelRoutes from "../routes/Panel.routes";
import errorRoutes from "./Error.routes";
import errorAxios from "./ErrorAxios.routes";

const router = createBrowserRouter([
  landingRoutes,
  loginRoutes,
  panelRoutes,
  errorRoutes,
  errorAxios
]);

export default router;