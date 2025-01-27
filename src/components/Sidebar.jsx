import { Link, NavLink } from "react-router";
import { useState } from "react";
import { HomeIcon, ShoppingCartIcon, ClipboardDocumentIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Order History", path: "/order-history", icon: ClipboardDocumentIcon },
    { name: "My Cart", path: "/my-cart", icon: ShoppingCartIcon },
  ];

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold">My App</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded-md hover:bg-gray-700"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:flex-col md:w-64 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          My App
        </div>
        <nav className="flex flex-col p-2 space-y-2">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg text-sm font-medium ${
                  isActive ? "bg-gray-700 text-orange-400" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
              <Icon className="h-6 w-6 mr-3" />
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
