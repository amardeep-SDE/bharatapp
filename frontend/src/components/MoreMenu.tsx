import { useCallback } from "react";
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
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

type MenuAction = "settings" | "theme" | "logout";

type MenuItem =
  | { id: string; label: string; icon: LucideIcon; action?: MenuAction }
  | { id: string; divider: true };

const MENU_ITEMS: readonly MenuItem[] = [
  { id: "settings", label: "Settings", icon: Settings, action: "settings" },
  { id: "activity", label: "Your activity", icon: Activity },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "appearance", label: "Switch appearance", icon: Sun, action: "theme" },
  { id: "report", label: "Report a problem", icon: MessageSquareWarning },
  { id: "primary-divider", divider: true },
  { id: "accounts", label: "Switch accounts", icon: Users },
  { id: "logout", label: "Log out", icon: LogOut, action: "logout" },
];

const MoreMenu = ({ open, onClose }: Props) => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAction = useCallback(
    (action?: MenuAction) => {
      switch (action) {
        case "settings":
          navigate("/settings");
          break;
        case "theme":
          toggleTheme();
          break;
        case "logout":
          alert("You have been logged out!");
          break;
        default:
          break;
      }
      onClose();
    },
    [navigate, onClose, toggleTheme],
  );

  if (!open) return null;

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
        {MENU_ITEMS.map((item) => {
          if (item.divider) {
            return (
              <div
                key={item.id}
                className={`mx-3 my-2 border-t ${
                  darkMode ? "border-gray-800" : "border-gray-200"
                }`}
              />
            );
          }

          const Icon = item.action === "theme" && darkMode ? Moon : item.icon;
          const isLogout = item.action === "logout";

          return (
            <button
              key={item.id}
              onClick={() => handleAction(item.action)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mx-1 my-0.5 transition-all duration-200
              ${
                isLogout
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
                <Icon size={18} />
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default MoreMenu;
