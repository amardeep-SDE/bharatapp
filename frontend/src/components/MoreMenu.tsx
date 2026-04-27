import React from "react";
import {
  Settings,
  Bookmark,
  Activity,
  Sun,
  Moon,
  MessageSquareWarning,
  LogOut,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MoreMenu: React.FC<Props> = ({ open, onClose }) => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  if (!open) return null;

  const handleAction = (label: string) => {
    switch (label) {
      case "Settings":
        navigate("/settings");
        break;
      case "Switch appearance":
        toggleTheme();
        break;
      case "Log out":
        alert("You have been logged out!");
        break;
      default:
        break;
    }
    onClose();
  };

  const menuItems = [
    { label: "Settings", icon: <Settings size={18} /> },
    { label: "Your activity", icon: <Activity size={18} /> },
    { label: "Saved", icon: <Bookmark size={18} /> },
    {
      label: "Switch appearance",
      icon: darkMode ? <Moon size={18} /> : <Sun size={18} />,
    },
    { label: "Report a problem", icon: <MessageSquareWarning size={18} /> },
    { divider: true },
    { label: "Switch accounts", icon: <Users size={18} /> },
    { label: "Log out", icon: <LogOut size={18} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`absolute left-24 bottom-20 z-50 w-64 rounded-2xl border shadow-2xl overflow-hidden animate-fadeIn
        ${
          darkMode
            ? "bg-gray-950/95 border-gray-800 text-white"
            : "bg-white/95 border-gray-200 text-gray-800"
        } backdrop-blur-xl`}
      >
        {menuItems.map((item, index) =>
          item.divider ? (
            <div
              key={index}
              className={`mx-3 my-2 border-t ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            />
          ) : (
            <button
              key={index}
              onClick={() => handleAction(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mx-1 my-0.5 transition-all duration-200
              ${
                item.label === "Log out"
                  ? darkMode
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-red-600 hover:bg-red-50"
                  : darkMode
                  ? "text-gray-200 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
    </>
  );
};

export default MoreMenu;