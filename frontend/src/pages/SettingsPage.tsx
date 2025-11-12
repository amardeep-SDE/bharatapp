import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Users,
  EyeOff,
  Bookmark,
  MessageSquare,
  AtSign,
  MessageCircle,
  Share2,
  ListMinus,
  Type,
  Eye,
  Crown,
  Archive,
  Settings,
  Globe,
} from "lucide-react";

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Edit profile");

  const sections = [
    { title: "Edit profile", icon: <User size={18} /> },
    { title: "Notifications", icon: <Bell size={18} /> },
    { title: "Account privacy", icon: <Lock size={18} /> },
    { title: "Close Friends", icon: <Users size={18} /> },
    { title: "Blocked", icon: <EyeOff size={18} /> },
    { title: "Messages and story replies", icon: <MessageSquare size={18} /> },
    { title: "Tags and mentions", icon: <AtSign size={18} /> },
    { title: "Comments", icon: <MessageCircle size={18} /> },
    { title: "Sharing", icon: <Share2 size={18} /> },
    { title: "Restricted accounts", icon: <ListMinus size={18} /> },
    { title: "Hidden Words", icon: <Type size={18} /> },
    { title: "Muted accounts", icon: <Eye size={18} /> },
    { title: "Content preferences", icon: <Bookmark size={18} /> },
    { title: "Like and share counts", icon: <HeartIcon /> },
    { title: "Subscriptions", icon: <Crown size={18} /> },
    { title: "Archiving and downloading", icon: <Archive size={18} /> },
    { title: "Language", icon: <Globe size={18} /> },
  ];

  return (
    <div
      className="
        flex h-screen
        bg-gray-50 dark:bg-[#0d0d0d]
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* Left Sidebar */}
      <div
        className="
          w-[280px] border-r border-gray-200 dark:border-gray-800
          bg-white dark:bg-[#121212]
          overflow-y-auto transition-colors duration-300
        "
      >
        <h2
          className="
            text-2xl font-semibold p-4 border-b
            border-gray-200 dark:border-gray-800
          "
        >
          Settings
        </h2>

        <div className="flex flex-col">
          {sections.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveSection(item.title)}
              className={`
                flex items-center gap-3 px-4 py-3 text-sm text-left
                hover:bg-gray-100 dark:hover:bg-gray-900
                transition-colors duration-200
                ${
                  activeSection === item.title
                    ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              `}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content Panel */}
      <div
        className="
          flex-1 overflow-y-auto p-8
          bg-white dark:bg-[#121212]
          transition-colors duration-300
        "
      >
        {activeSection === "Edit profile" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

            {/* Profile Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://i.pravatar.cc/100?u=amardeep"
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />
              <div>
                <h3 className="font-semibold text-lg">10_amardeep_16</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  अमरदीप द्विवेदी
                </p>
                <button className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                  Change photo
                </button>
              </div>
            </div>

            {/* Website */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="text"
                placeholder="Website"
                className="
                  w-full p-2 border rounded-md outline-none
                  bg-gray-100 dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-200
                  placeholder-gray-500 dark:placeholder-gray-400
                  transition-colors
                "
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Editing your links is only available on mobile.
              </p>
            </div>

            {/* Bio */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                rows={3}
                placeholder="Add bio..."
                className="
                  w-full p-2 border rounded-md outline-none
                  bg-gray-100 dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-200
                  placeholder-gray-500 dark:placeholder-gray-400
                  transition-colors
                "
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                137 / 150
              </p>
            </div>

            {/* Gender */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                className="
                  w-full p-2 border rounded-md outline-none
                  bg-gray-100 dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-gray-200
                  transition-colors
                "
              >
                <option>Male</option>
                <option>Female</option>
                <option>Custom</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This won’t be part of your public profile.
              </p>
            </div>

            {/* Save Button */}
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition">
              Submit
            </button>
          </div>
        )}

        {/* Other Sections Placeholder */}
        {activeSection !== "Edit profile" && (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-32">
            <Settings className="mx-auto mb-3" size={28} />
            <p>{activeSection} settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ❤️ Custom Heart Icon
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className="w-4 h-4"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export default SettingsPage;
