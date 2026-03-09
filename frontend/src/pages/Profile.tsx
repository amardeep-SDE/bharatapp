import React, { useState } from "react";
import {
  Grid,
  Film,
  Bookmark,
  User,
  Settings,
  PlusCircle,
} from "lucide-react";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", icon: <Grid size={18} />, label: "Posts" },
    { id: "reels", icon: <Film size={18} />, label: "Reels" },
    { id: "saved", icon: <Bookmark size={18} />, label: "Saved" },
    { id: "tagged", icon: <User size={18} />, label: "Tagged" },
  ];

  const highlights = [
    "Wedding",
    "#MTMY",
    "❤️",
    "#राधा",
    "चाचा/मामा",
    "माँ",
    "Trips",
    "Memories",
    "Office",
    "Friends",
  ];

  const posts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    img: `https://picsum.photos/seed/profile_${i}/600/600`,
  }));

  return (
    <section className="max-w-5xl mx-auto px-4 pt-6 pb-10 text-gray-900 dark:text-gray-100">
      {/* PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* Avatar */}
        <div className="relative">

          <img
            src="https://i.pravatar.cc/200?u=amardeep"
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />

          {/* NOTE BUBBLE */}
          <div className="absolute -top-3 left-24 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
            Note...
          </div>

        </div>

        {/* USER INFO */}
        <div className="flex-1">

          {/* Username */}
          <div className="flex items-center gap-3 mb-4">

            <h2 className="text-2xl font-semibold">
              10_amardeep_16
            </h2>

            {/* SETTINGS ICON */}
            <Settings size={20} className="cursor-pointer" />

            <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700">
              Edit Profile
            </button>

            <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700">
              View Archive
            </button>

          </div>

          {/* Stats */}
          <ul className="flex gap-6 mb-3 text-sm">
            <li>
              <span className="font-semibold">265</span> posts
            </li>
            <li>
              <span className="font-semibold">234</span> followers
            </li>
            <li>
              <span className="font-semibold">180</span> following
            </li>
          </ul>

          {/* Bio */}
          <div className="text-sm">
            <p className="font-semibold">अमरदीप द्विवेदी</p>
            <p>@engineer 💡</p>
            <p>#16_june 🎂 · 🇮🇳 भारत · ❤️ healthHelpline</p>
          </div>

        </div>
      </div>

      {/* STORIES / HIGHLIGHTS */}

      <div className="mt-10 overflow-x-auto">
        <div className="flex gap-6 min-w-max">

          {/* ADD STORY */}
          <div className="flex flex-col items-center text-xs cursor-pointer">
            <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center">
              <PlusCircle size={26} />
            </div>
            <p className="mt-1">New</p>
          </div>

          {highlights.map((title, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-xs cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <img
                  src={`https://i.pravatar.cc/100?u=highlight_${i}`}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black"
                />
              </div>

              <p className="mt-1 w-20 text-center truncate">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}

      <div className="flex justify-center border-t mt-10 border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-t-2 ${
              activeTab === tab.id
                ? "border-black dark:border-white"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}

      <div className="grid grid-cols-3 gap-1 mt-4">
        {posts.map((post) => (
          <img
            key={post.id}
            src={post.img}
            alt="post"
            className="w-full aspect-square object-cover hover:opacity-80 cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;