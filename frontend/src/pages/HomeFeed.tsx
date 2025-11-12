import React from "react";

const HomeFeed: React.FC = () => {
  return (
    <section
      className="
        max-w-xl mx-auto w-full
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {/* ✅ Stories Section */}
      <div
        className="
          flex gap-4 overflow-x-auto p-3 mb-6 rounded-lg border
          bg-white dark:bg-[#121212]
          border-gray-200 dark:border-gray-800
          scrollbar-hide transition-colors duration-300
        "
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-300"
          >
            <img
              src={`https://i.pravatar.cc/80?u=${i}`}
              className="
                w-16 h-16 rounded-full border-2 border-pink-500 p-[2px]
                hover:scale-105 transition-transform duration-200
              "
              alt={`user_${i}`}
            />
            <p className="truncate w-16 text-center mt-1">user_{i}</p>
          </div>
        ))}
      </div>

      {/* ✅ Posts Section */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <article
            key={i}
            className="
              rounded-lg shadow-sm border
              bg-white dark:bg-[#121212]
              border-gray-200 dark:border-gray-800
              transition-colors duration-300
            "
          >
            {/* Post Header */}
            <header
              className="
                flex items-center gap-3 p-3
                border-b border-gray-100 dark:border-gray-800
              "
            >
              <img
                src={`https://i.pravatar.cc/150?u=${i}`}
                className="w-10 h-10 rounded-full object-cover"
                alt={`user_${i}`}
              />
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                user_{i}
              </span>
            </header>

            {/* Post Image */}
            <div className="bg-black/5 dark:bg-black/30">
              <img
                src={`https://picsum.photos/seed/${i}/800/800`}
                alt="Post"
                className="w-full object-cover max-h-[600px] select-none"
              />
            </div>

            {/* Post Details */}
            <div className="p-3 text-sm">
              <p className="text-gray-800 dark:text-gray-200">
                ❤️ Liked by <strong>user_12</strong> and others
              </p>
              <p className="mt-1 text-gray-800 dark:text-gray-300">
                <strong>user_{i}</strong> This is my BharatGram post #{i}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                1 day ago
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeFeed;
