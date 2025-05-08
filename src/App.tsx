// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import router from "./routes/router";
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <RouterProvider router={router} />
    </BrowserRouter>
  );
};

export default App;
