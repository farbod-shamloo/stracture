import { createBrowserRouter } from "react-router-dom";
import landingRoutes from "../routes/Landing.routes";
import loginRoutes from "../routes/Login.routes";
import panelRoutes from "../routes/Panel.routes";

const router = createBrowserRouter([
  landingRoutes,
  loginRoutes,
  panelRoutes,
]);

export default router;