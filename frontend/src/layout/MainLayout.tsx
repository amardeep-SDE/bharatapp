import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const MainLayout: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const location = useLocation();

  const handleOpenPanel = (panel: string | null) => setActivePanel(panel);
  const handleClosePanel = () => setActivePanel(null);

  // 🧠 Close any open panels automatically on route change
  useEffect(() => {
    setActivePanel(null);
  }, [location.pathname]);

  // Sidebar collapsed if panel open or Messages route active
  // const isCollapsed = activePanel !== null || location.pathname === "/messages";
  const isCollapsed = location.pathname === "/messages";

  return (
    <div
      className={`
        flex bg-gray-50 dark:bg-[#0d0d0d] min-h-screen
        transition-colors duration-300
      `}
    >
      {/* Left Sidebar */}
      <LeftSidebar
        activePanel={activePanel}
        onOpenPanel={handleOpenPanel}
        onClosePanel={handleClosePanel}
      />

      {/* Main Content Area */}
      <main
        className={`
          flex-1 transition-all duration-300
          ${isCollapsed ? "lg:ml-[90px]" : "lg:ml-64 xl:mr-80"}
          p-4
        `}
      >
        <Outlet />
      </main>

      {/* ✅ Hide RightSidebar for Messages route or when panel open */}
      {/* {location.pathname !== "/messages" && !activePanel && <RightSidebar />} */}
      {location.pathname !== "/messages" && <RightSidebar />}

    </div>
  );
};

export default MainLayout;
