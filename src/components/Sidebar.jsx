import React from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Clock,
  History,
} from "lucide-react";

import logo from "../assets/Logo.png";

const Sidebar = ({ User }) => {
  const navItems = [
    { name: "POS", path: "/pos", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Pick-up", path: "/pickup", icon: <Clock className="w-5 h-5" />, badge: 2 },
    { name: "History", path: "/history", icon: <History className="w-5 h-5" /> },
  ];

  return (
    <aside className="flex flex-col w-48 min-h-screen bg-white border-r border-gray-200">
      {/* Logo and Cafe Information */}
      <div className="flex flex-col px-4 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Whisked Cafe Logo" className="w-8 h-8" />
          <div>
            <h2 className="font-semibold text-primary">Whisked Cafe</h2>
            <p className="text-xs text-gray-500">Cashier</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-1 mt-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-4 py-2 ${
                  isActive
                    ? "bg-[#FDF7F3] text-[#8B4513] font-medium border-l-4 border-[#8B4513]"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;