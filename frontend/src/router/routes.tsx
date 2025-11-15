import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Profile from "../pages/Profile.js";
import Messages from "../pages/Messages.js";
import SettingsPage from "../pages/SettingsPage.js";
import Reels from "../pages/Reels.js";

const HomeFeed = lazy(() => import("../pages/HomeFeed"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeFeed /> },
      { path: "profile", element: <Profile /> },
      { path: "messages", element: <Messages /> },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
       { path: "reels", element: <Reels /> }
    ],
  },
]);
