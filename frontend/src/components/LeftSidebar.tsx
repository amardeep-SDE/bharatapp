import React, { useState } from "react";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Menu,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchPanel from "./SearchPanel";
import NotificationsPanel from "./NotificationsPanel";
import MoreMenu from "./MoreMenu";

interface LeftSidebarProps {
  activePanel: string | null;
  onOpenPanel: (panel: string) => void;
  onClosePanel: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activePanel,
  onOpenPanel,
  onClosePanel,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openMore, setOpenMore] = useState(false);

  const togglePanel = (panel: string) => {
    if (activePanel === panel) onClosePanel();
    else onOpenPanel(panel);
  };

  // collapse sidebar if any panel or messages route active
  const isCollapsed = activePanel !== null || location.pathname === "/messages";

  const toggleMessages = () => {
    if (location.pathname === "/messages") navigate("/");
    else navigate("/messages");
  };

  return (
    <>
      <aside
        className={`
          flex flex-col justify-between
          border-r border-gray-200 dark:border-gray-800
          bg-white dark:bg-[#121212]
          h-screen fixed left-0 top-0 p-4 z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20 items-center" : "w-64"}
        `}
      >
        {/* Logo */}
        {!isCollapsed ? (
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-8 pl-2">
            BharatGram
          </h1>
        ) : (
          <div className="mb-8 w-10 h-10 rounded-md bg-blue-600 dark:bg-blue-500" />
        )}

        {/* Menu */}
        <nav className="space-y-4 w-full">
          <NavLink
            to="/"
            onClick={onClosePanel}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 justify-center sm:justify-start text-gray-800 dark:text-gray-200 transition"
          >
            <Home size={22} /> {!isCollapsed && "Home"}
          </NavLink>

          <button
            onClick={() => togglePanel("search")}
            className={`flex items-center gap-3 p-2 w-full rounded-lg justify-center sm:justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition ${
              activePanel === "search" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <Search size={22} /> {!isCollapsed && "Search"}
          </button>

          <NavLink
            to="/explore"
            onClick={onClosePanel}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 justify-center sm:justify-start text-gray-800 dark:text-gray-200 transition"
          >
            <Compass size={22} /> {!isCollapsed && "Explore"}
          </NavLink>

          <NavLink
            to="/reels"
            onClick={onClosePanel}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 justify-center sm:justify-start text-gray-800 dark:text-gray-200 transition"
          >
            <Film size={22} /> {!isCollapsed && "Reels"}
          </NavLink>

          {/* 💬 MESSAGES (Route-based toggle) */}
          <button
            onClick={toggleMessages}
            className={`flex items-center gap-3 p-2 w-full rounded-lg justify-center sm:justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition ${
              location.pathname === "/messages" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <MessageCircle size={22} /> {!isCollapsed && "Messages"}
          </button>

          <button
            onClick={() => togglePanel("notifications")}
            className={`flex items-center gap-3 p-2 w-full rounded-lg justify-center sm:justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition ${
              activePanel === "notifications" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <Heart size={22} /> {!isCollapsed && "Notifications"}
          </button>

          <button
            onClick={() => togglePanel("create")}
            className={`flex items-center gap-3 p-2 w-full rounded-lg justify-center sm:justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition ${
              activePanel === "create" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <PlusSquare size={22} /> {!isCollapsed && "Create"}
          </button>

          <NavLink
            to="/profile"
            onClick={onClosePanel}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 justify-center sm:justify-start text-gray-800 dark:text-gray-200 transition"
          >
            <User size={22} /> {!isCollapsed && "Profile"}
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="relative w-full">
          <button
            onClick={() => setOpenMore((prev) => !prev)}
            className={`flex items-center gap-3 p-2 w-full rounded-lg justify-center sm:justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition ${
              openMore ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <Menu size={22} /> {!isCollapsed && "More"}
          </button>
          <MoreMenu open={openMore} onClose={() => setOpenMore(false)} />
        </div>
      </aside>

      {/* Panels */}
      <SearchPanel
        open={activePanel === "search"}
        onClose={onClosePanel}
        sidebarWidth={isCollapsed ? 80 : 256}
      />
      <NotificationsPanel
        open={activePanel === "notifications"}
        onClose={onClosePanel}
        sidebarWidth={isCollapsed ? 80 : 256}
      />
    </>
  );
};

export default LeftSidebar;
