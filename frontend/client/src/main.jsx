import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Main from "./Components/Main/Main.jsx";
import AdminPage from "./Components/AdminPage/AdminPage.jsx";
import MentalHealth from "./Components/MentalHealth/MentalHealth.jsx";
import PCS from "./Components/PCS/PCS.jsx";

import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mentalhealth" element={<MentalHealth />} />
        <Route path="/PCS" element={<PCS />} />
        {/* <Route path="/pcs" element={<PCS />} /> */}

        <Route path="/Forget" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
