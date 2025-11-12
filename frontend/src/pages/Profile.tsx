import React, { useState } from "react";
import { Grid, Film, Bookmark, User } from "lucide-react";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", icon: <Grid size={18} />, label: "Posts" },
    { id: "reels", icon: <Film size={18} />, label: "Reels" },
    { id: "saved", icon: <Bookmark size={18} />, label: "Saved" },
    { id: "tagged", icon: <User size={18} />, label: "Tagged" },
  ];

  const highlights = [
    { title: "Wedding" },
    { title: "#MTMY" },
    { title: "❤️" },
    { title: "#राधा" },
    { title: "चाचा/मामा" },
  ];

  const posts = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    img: `https://picsum.photos/seed/profile_${i}/600/600`,
  }));

  return (
    <section
      className="
        max-w-4xl mx-auto px-4 pt-6 pb-10
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* 🧍‍♂️ Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/200?u=amardeep"
          alt="Amardeep"
          className="w-36 h-36 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />

        {/* User Details */}
        <div className="flex-1">
          {/* Username and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h2 className="text-2xl font-semibold">10_amardeep_16</h2>
            <div className="flex gap-2">
              <button
                className="
                  bg-gray-100 dark:bg-gray-800
                  text-gray-800 dark:text-gray-200
                  px-4 py-1 rounded-md text-sm font-semibold
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition
                "
              >
                Edit Profile
              </button>
              <button
                className="
                  bg-gray-100 dark:bg-gray-800
                  text-gray-800 dark:text-gray-200
                  px-4 py-1 rounded-md text-sm font-semibold
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition
                "
              >
                View Archive
              </button>
            </div>
          </div>

          {/* Stats */}
          <ul className="flex gap-6 mb-3 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold">265</span> posts
            </li>
            <li>
              <span className="font-semibold">229</span> followers
            </li>
            <li>
              <span className="font-semibold">161</span> following
            </li>
          </ul>

          {/* Bio */}
          <div className="text-sm">
            <p className="font-semibold">अमरदीप द्विवेदी ⚙️</p>
            <p>@engineer 💡</p>
            <p>#16_june 🎂 · 🇮🇳 भारत IN · ❤️ #healthHelpline</p>
          </div>
        </div>
      </div>

      {/* 🧿 Highlights */}
      <div
        className="
          flex gap-6 overflow-x-auto mt-10 pb-4 scrollbar-hide
          text-gray-700 dark:text-gray-300
        "
      >
        {highlights.map((h, i) => (
          <div key={i} className="flex flex-col items-center text-xs">
            <div
              className="
                w-20 h-20 rounded-full border border-gray-300 dark:border-gray-700
                p-[2px] flex items-center justify-center
                hover:scale-105 transition-transform
              "
            >
              <img
                src={`https://i.pravatar.cc/100?u=highlight_${i}`}
                alt={h.title}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="mt-1 truncate w-20 text-center">{h.title}</p>
          </div>
        ))}
      </div>

      {/* 🧩 Tabs */}
      <div
        className="
          flex justify-center border-t mt-10
          border-gray-200 dark:border-gray-800
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-semibold border-t-2
              transition-colors duration-200
              ${
                activeTab === tab.id
                  ? "border-black dark:border-white text-black dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📸 Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {posts.map((post) => (
          <img
            key={post.id}
            src={post.img}
            alt="Post"
            className="
              w-full aspect-square object-cover cursor-pointer
              hover:opacity-80 dark:hover:opacity-90
              transition-opacity
            "
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
