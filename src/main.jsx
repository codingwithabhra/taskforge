import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Team from "./pages/Team.jsx";
import { ToastContainer, Slide } from "react-toastify";
import { MainContextProvider } from "./contexts/useMainContext.jsx";
import TeamDetails from "./pages/TeamDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/team/:teamId",
    element: <TeamDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </MainContextProvider>
  </StrictMode>,
);
