import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import FloatingMessages from "../components/FloatingMessages.js";

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
  const isProfilePage = location.pathname === "/profile";
const isMessagesPage = location.pathname === "/messages";
const isCollapsed = activePanel !== null || isMessagesPage;
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
    ${
      isProfilePage
        ? "lg:ml-64"                 // sidebar ke baad start
        : isMessagesPage
        ? "lg:ml-[90px]"
        : "lg:ml-64 xl:mr-80"
    }
    px-4
  `}
>
  {isProfilePage ? (
    /* 🔥 INSTAGRAM STYLE CENTER CONTAINER */
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet />
  )}
</main>


      {/* ✅ Hide RightSidebar for Messages route or when panel open */}
      {/* {location.pathname !== "/messages" && !activePanel && <RightSidebar />} */}
      {location.pathname !== "/messages" &&
        location.pathname !== "/profile" && <RightSidebar />}
        <FloatingMessages/>
    </div>
  );
};

export default MainLayout;
