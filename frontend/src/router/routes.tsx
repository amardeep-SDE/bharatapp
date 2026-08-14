import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const HomeFeed = lazy(() => import("../pages/HomeFeed"));
const Login = lazy(() => import("../pages/Login"));
const Messages = lazy(() => import("../pages/Messages"));
const Profile = lazy(() => import("../pages/Profile"));
const Register = lazy(() => import("../pages/Register"));
const Reels = lazy(() => import("../pages/Reels"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
export const router = createBrowserRouter([
  // 🔓 Public routes (no layout)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // 🔐 App routes (with layout)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeFeed /> },
      { path: "profile", element: <Profile /> },
      { path: "messages", element: <Messages /> },
      { path: "reels", element: <Reels /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
