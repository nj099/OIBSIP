import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/RegisterPage';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from "./ProtectedRoute";
import './App.css'

function App() {


  return (<BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter> )
}

export default App
