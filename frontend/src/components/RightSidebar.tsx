import React from "react";

const suggestions = [
  { name: "mudddavibe", mutual: "Followed by dk16garg" },
  { name: "maygirl__", mutual: "Followed by theganpat" },
  { name: "thenewspinch", mutual: "Followed by bhaskarchauhan" },
  { name: "jyoti_07_97", mutual: "Followed by neha_ravi_" },
];

const RightSidebar: React.FC = () => (
  <aside
    className="
      hidden xl:flex flex-col w-80 h-screen fixed right-0 top-0
      border-l border-gray-200 dark:border-gray-800
      bg-white dark:bg-[#121212]
      p-4 transition-colors duration-300
    "
  >
    {/* User Info */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          10_amardeep_16
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          अमरदीप द्विवेदी
        </p>
      </div>
      <button className="text-blue-500 dark:text-blue-400 font-semibold text-sm hover:underline">
        Switch
      </button>
    </div>

    {/* Suggested Header */}
    <div className="flex justify-between items-center mb-3">
      <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
        Suggested for you
      </p>
      <button className="text-sm font-semibold text-gray-900 dark:text-gray-200 hover:underline">
        See All
      </button>
    </div>

    {/* Suggestions List */}
    <div className="space-y-4">
      {suggestions.map((s, i) => (
        <div
          key={i}
          className="
            flex items-center justify-between
            hover:bg-gray-50 dark:hover:bg-gray-900
            p-2 rounded-md transition-colors
          "
        >
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {s.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {s.mutual}
            </p>
          </div>
          <button className="text-blue-500 dark:text-blue-400 text-sm font-semibold hover:underline">
            Follow
          </button>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="text-xs text-gray-400 dark:text-gray-500 mt-8 leading-relaxed">
      About · Help · Press · API · Jobs · Privacy · Terms
      <br />
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold text-gray-500 dark:text-gray-400">
        BHARATGRAM FROM AMARDEEP 🇮🇳
      </span>
    </div>
  </aside>
);

export default RightSidebar;
