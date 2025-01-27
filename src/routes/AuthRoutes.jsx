import { Navigate, Outlet } from "react-router";

const AuthRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  // If authenticated, redirect to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoutes;
