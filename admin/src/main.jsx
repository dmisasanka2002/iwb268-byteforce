import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ElectionContextProvider from "./contexts/ElectionContext.jsx";
import ProtectedRouts from "./utils/ProtectedRouts.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <ElectionContextProvider>
        <Routes>
          <Route element={<ProtectedRouts />}>
            <Route path="*" element={<App />} />{" "}
          </Route>
        </Routes>
      </ElectionContextProvider>
    </BrowserRouter>
  </StrictMode>
);
