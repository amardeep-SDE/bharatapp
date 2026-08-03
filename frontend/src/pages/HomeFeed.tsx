import { useCallback, useState } from "react";
import StoryViewer from "../components/StoryViewer";

const STORIES = Array.from({ length: 10 }, (_, id) => ({
  id,
  user: `user_${id}`,
  avatar: `https://i.pravatar.cc/80?u=${id}`,
  type: "image",
  url: `https://picsum.photos/seed/story${id}/800/1200`,
  // Keep demo content stable between renders so opening a story does not change its view count.
  seenBy: (id * 17 + 11) % 50,
}));

const POSTS = Array.from({ length: 3 }, (_, id) => ({
  id,
  user: `user_${id}`,
  avatar: `https://i.pravatar.cc/150?u=${id}`,
  image: `https://picsum.photos/seed/${id}/800/800`,
}));

const HomeFeed = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openStory = useCallback((index: number) => setActiveIndex(index), []);

  return (
    <>
      <section className="mx-auto w-full max-w-xl text-gray-900 transition-colors duration-300 dark:text-gray-100">
        <div className="scrollbar-hide mb-6 flex gap-4 overflow-x-auto rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-[#121212]">
          {STORIES.map((story, index) => (
            <button
              key={story.id}
              type="button"
              onClick={() => openStory(index)}
              className="flex shrink-0 flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-[#121212]"
              aria-label={`View ${story.user}'s story`}
            >
              <img
                src={story.avatar}
                alt=""
                width={64}
                height={64}
                decoding="async"
                className="h-16 w-16 rounded-full border-2 border-pink-500 p-[2px] transition-transform hover:scale-105"
              />
              <span className="mt-1 w-16 truncate text-center">{story.user}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#121212]"
            >
              <header className="flex items-center gap-3 border-b border-gray-100 p-3 dark:border-gray-800">
                <img
                  src={post.avatar}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-sm font-semibold">{post.user}</span>
              </header>

              <img
                src={post.image}
                alt={`${post.user}'s BharatGram post`}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="max-h-[600px] w-full object-cover"
              />

              <div className="p-3 text-sm">
                <p>❤️ Liked by <strong>user_12</strong> and others</p>
                <p className="mt-1"><strong>{post.user}</strong> This is my BharatGram post #{post.id}</p>
                <p className="mt-1 text-xs text-gray-500">1 day ago</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <StoryViewer stories={STORIES} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </>
  );
};

export default HomeFeed;
