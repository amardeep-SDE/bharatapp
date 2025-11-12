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
import { useTheme } from "../context/ThemeContext"; // <-- added

interface Props {
  open: boolean;
  onClose: () => void;
}

const MoreMenu: React.FC<Props> = ({ open, onClose }) => {
  const { darkMode, toggleTheme } = useTheme(); // <-- global hook
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
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose}></div>

      <div
        className={`absolute left-24 bottom-20 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-lg rounded-xl w-64 border z-50 animate-fadeIn`}
      >
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr
              key={index}
              className={`${darkMode ? "border-gray-700" : "border-gray-200"} my-1`}
            />
          ) : (
            <button
              key={index}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-200"
                  : "hover:bg-gray-100 text-gray-800"
              } transition-colors duration-200`}
              onClick={() => handleAction(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
    </>
  );
};

export default MoreMenu;
