import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import ProtectedRouts from "./utils/ProtectedRouts.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ElectionContextProvider from "./contexts/ElectionContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientID}>
    <React.StrictMode>
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
    </React.StrictMode>
  </GoogleOAuthProvider>
);
