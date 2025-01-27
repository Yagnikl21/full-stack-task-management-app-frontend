import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import NotFound from "../pages/NotFound";
import OrderHistory from "../pages/OrderHistory";
import Mycart from "../pages/Mycart";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes wrapped with AuthRoutes */}
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes wrapped with ProtectedRoute */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/my-cart" element={<Mycart />} />
      </Route>

      {/* Base Route */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      {/* 404 Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
