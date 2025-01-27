import { Navigate, Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return isAuthenticated ? (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`grow bg-gray-100 h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
