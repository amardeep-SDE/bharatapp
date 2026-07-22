import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Film,
  Heart,
  Home,
  Menu,
  MessageCircle,
  PlusSquare,
  Search,
  User,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CreateModal from "./CreateModal";
import MoreMenu from "./MoreMenu";
import NotificationsPanel from "./NotificationsPanel";
import SearchPanel from "./SearchPanel";

interface LeftSidebarProps {
  activePanel: string | null;
  onOpenPanel: (panel: string) => void;
  onClosePanel: () => void;
}

interface RouteItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const HOME_ROUTE: RouteItem = { to: "/", label: "Home", icon: Home };

const DISCOVERY_ROUTES: RouteItem[] = [
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/reels", label: "Reels", icon: Film },
];

const PROFILE_ROUTE: RouteItem = {
  to: "/profile",
  label: "Profile",
  icon: User,
};

const menuItemClass =
  "flex w-full items-center gap-3 rounded-lg p-2 text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800";
const activeMenuItemClass = "bg-gray-100 dark:bg-gray-800";

const LeftSidebar = ({
  activePanel,
  onOpenPanel,
  onClosePanel,
}: LeftSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isCollapsed = activePanel !== null || location.pathname === "/messages";
  const sidebarWidth = isCollapsed ? 80 : 256;
  const itemAlignment = isCollapsed ? "justify-center" : "justify-start";

  const togglePanel = (panel: string) => {
    if (activePanel === panel) {
      onClosePanel();
      return;
    }

    onOpenPanel(panel);
  };

  const toggleMessages = () => {
    navigate(location.pathname === "/messages" ? "/" : "/messages");
  };

  const renderLabel = (label: string) => !isCollapsed && <span>{label}</span>;

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col justify-between border-r border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-[#121212] ${
          isCollapsed ? "w-20 items-center" : "w-64"
        }`}
      >
        <div className="w-full">
          {isCollapsed ? (
            <div className="mb-8 h-10 w-10 rounded-md bg-blue-600 dark:bg-blue-500" />
          ) : (
            <h1 className="mb-8 pl-2 text-2xl font-bold text-blue-600 dark:text-blue-500">
              BharatGram
            </h1>
          )}

          <nav className="w-full space-y-4" aria-label="Primary navigation">
            <NavLink
              to={HOME_ROUTE.to}
              end
              onClick={onClosePanel}
              className={({ isActive }) =>
                `${menuItemClass} ${itemAlignment} ${
                  isActive ? activeMenuItemClass : ""
                }`
              }
            >
              <HOME_ROUTE.icon size={22} />
              {renderLabel(HOME_ROUTE.label)}
            </NavLink>

            <button
              type="button"
              onClick={() => togglePanel("search")}
              aria-pressed={activePanel === "search"}
              className={`${menuItemClass} ${itemAlignment} ${
                activePanel === "search" ? activeMenuItemClass : ""
              }`}
            >
              <Search size={22} />
              {renderLabel("Search")}
            </button>

            {DISCOVERY_ROUTES.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClosePanel}
                className={({ isActive }) =>
                  `${menuItemClass} ${itemAlignment} ${
                    isActive ? activeMenuItemClass : ""
                  }`
                }
              >
                <Icon size={22} />
                {renderLabel(label)}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggleMessages}
              aria-pressed={location.pathname === "/messages"}
              className={`${menuItemClass} ${itemAlignment} ${
                location.pathname === "/messages" ? activeMenuItemClass : ""
              }`}
            >
              <MessageCircle size={22} />
              {renderLabel("Messages")}
            </button>

            <button
              type="button"
              onClick={() => togglePanel("notifications")}
              aria-pressed={activePanel === "notifications"}
              className={`${menuItemClass} ${itemAlignment} ${
                activePanel === "notifications" ? activeMenuItemClass : ""
              }`}
            >
              <Heart size={22} />
              {renderLabel("Notifications")}
            </button>

            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className={`${menuItemClass} ${itemAlignment}`}
            >
              <PlusSquare size={22} />
              {renderLabel("Create")}
            </button>

            <NavLink
              to={PROFILE_ROUTE.to}
              onClick={onClosePanel}
              className={({ isActive }) =>
                `${menuItemClass} ${itemAlignment} ${
                  isActive ? activeMenuItemClass : ""
                }`
              }
            >
              <PROFILE_ROUTE.icon size={22} />
              {renderLabel(PROFILE_ROUTE.label)}
            </NavLink>
          </nav>
        </div>

        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setIsMoreOpen((isOpen) => !isOpen)}
            aria-expanded={isMoreOpen}
            className={`${menuItemClass} ${itemAlignment} ${
              isMoreOpen ? activeMenuItemClass : ""
            }`}
          >
            <Menu size={22} />
            {renderLabel("More")}
          </button>
          <MoreMenu open={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
        </div>
      </aside>

      <SearchPanel
        open={activePanel === "search"}
        onClose={onClosePanel}
        sidebarWidth={sidebarWidth}
      />
      <NotificationsPanel
        open={activePanel === "notifications"}
        onClose={onClosePanel}
        sidebarWidth={sidebarWidth}
      />
      <CreateModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </>
  );
};

export default LeftSidebar;
