import React, { useState } from "react";
import StoryViewer from "../components/StoryViewer";

const HomeFeed: React.FC = () => {

  const stories = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    user: `user_${i}`,
    avatar: `https://i.pravatar.cc/80?u=${i}`,
    type: "image",
    url: `https://picsum.photos/seed/story${i}/800/1200`,
    seenBy: Math.floor(Math.random() * 50)
  }));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section
        className="
          max-w-xl mx-auto w-full
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
        "
      >

        {/* STORIES */}
        <div
          className="
            flex gap-4 overflow-x-auto p-3 mb-6 rounded-lg border
            bg-white dark:bg-[#121212]
            border-gray-200 dark:border-gray-800
            scrollbar-hide
          "
        >

          {stories.map((story, index) => (

            <div
              key={story.id}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center text-xs cursor-pointer"
            >

              <img
                src={story.avatar}
                className="
                  w-16 h-16 rounded-full border-2 border-pink-500 p-[2px]
                  hover:scale-105 transition-transform
                "
              />

              <p className="truncate w-16 text-center mt-1">
                {story.user}
              </p>

            </div>

          ))}

        </div>


        {/* POSTS */}
        <div className="space-y-6">

          {Array.from({ length: 3 }).map((_, i) => (

            <article
              key={i}
              className="
                rounded-lg shadow-sm border
                bg-white dark:bg-[#121212]
                border-gray-200 dark:border-gray-800
              "
            >

              <header className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-800">

                <img
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  className="w-10 h-10 rounded-full"
                />

                <span className="font-semibold text-sm">
                  user_{i}
                </span>

              </header>


              <img
                src={`https://picsum.photos/seed/${i}/800/800`}
                className="w-full object-cover max-h-[600px]"
              />


              <div className="p-3 text-sm">

                <p>
                  ❤️ Liked by <strong>user_12</strong> and others
                </p>

                <p className="mt-1">
                  <strong>user_{i}</strong> This is my BharatGram post #{i}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  1 day ago
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* STORY VIEWER */}
      <StoryViewer
        stories={stories}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />

    </>
  );
};

export default HomeFeed;