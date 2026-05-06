import React, { memo } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";

const PostCard = memo(({ post }: { post: any }) => {
  return (
    <article
      className="
        bg-white dark:bg-[#121212]
        border border-gray-200 dark:border-gray-800
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
        max-w-xl mx-auto
      "
    >
      {/* Header */}
      <header
        className="
          flex items-center justify-between
          px-4 py-3
        "
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="
                w-11 h-11 rounded-full
                object-cover
                ring-2 ring-pink-500/70
              "
            />

            {/* Online Dot */}
            <span
              className="
                absolute bottom-0 right-0
                w-3 h-3 rounded-full
                bg-green-500 border-2 border-white
                dark:border-[#121212]
              "
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.user.name}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              2 hours ago
            </p>
          </div>
        </div>

        <button
          className="
            p-2 rounded-full
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition
          "
        >
          <MoreHorizontal
            size={20}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      </header>

      {/* Image */}
      <div className="relative group overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.caption}
          loading="lazy"
          className="
            w-full
            max-h-[550px]
            object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-black/0 group-hover:bg-black/10
            transition-all duration-300
          "
        />
      </div>

      {/* Actions */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="
              hover:scale-110
              transition-transform
            "
          >
            <Heart
              size={24}
              className="text-gray-700 dark:text-gray-200 hover:text-red-500"
            />
          </button>

          <button
            className="
              hover:scale-110
              transition-transform
            "
          >
            <MessageCircle
              size={23}
              className="text-gray-700 dark:text-gray-200"
            />
          </button>

          <button
            className="
              hover:scale-110
              transition-transform
            "
          >
            <Share2
              size={22}
              className="text-gray-700 dark:text-gray-200"
            />
          </button>
        </div>

        <button
          className="
            hover:scale-110
            transition-transform
          "
        >
          <Bookmark
            size={22}
            className="text-gray-700 dark:text-gray-200"
          />
        </button>
      </div>

      {/* Likes */}
      <div className="px-4 pt-3">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          12,482 likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <span className="font-semibold text-gray-900 dark:text-white mr-2">
            {post.user.name}
          </span>
          {post.caption}
        </p>
      </div>

      {/* Comments */}
      <div className="px-4 pb-4">
        <button
          className="
            text-sm text-gray-500
            hover:text-gray-700
            dark:hover:text-gray-300
            transition
          "
        >
          View all comments
        </button>
      </div>
    </article>
  );
});

export default PostCard;