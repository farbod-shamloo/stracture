import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import "./index.css";
import router from "./routes/router"; // Import router

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Use RouterProvider to pass the router */}
  </StrictMode>
);
