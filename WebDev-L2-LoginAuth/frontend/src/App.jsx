import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import "./App.css";

function App() {
const [token, setToken] = useState(
localStorage.getItem("auth_token")
);

  return (<BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route
      path="/dashboard"
      element={
        token ? (
          <Dashboard />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />

    <Route
      path="*"
      element={<Navigate to="/login" replace />}
    />
      </Routes>
    </BrowserRouter> )
}

export default App
