import React, { memo } from "react";

const PostCard = memo(({ post }: { post: any }) => (
  // <article
  //   className="
  //     bg-white dark:bg-[#121212]
  //     border border-gray-200 dark:border-gray-800
  //     rounded-lg shadow-sm overflow-hidden
  //     transition-colors duration-300
  //   "
  // >
  <article
  className="
    bg-white dark:bg-[#121212]
    border border-gray-200 dark:border-gray-800
    rounded-lg shadow-sm overflow-hidden
    hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40
    transition-all duration-300
  "
>

    {/* Header */}
    <header
      className="
        flex items-center gap-3 p-3
        border-b border-gray-100 dark:border-gray-800
        transition-colors
      "
    >
      <img
        src={post.user.avatar}
        alt={post.user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {post.user.name}
      </span>
    </header>

    {/* Image */}
    <div className="bg-black/5 dark:bg-black/30">
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full object-cover max-h-[480px]"
        loading="lazy"
      />
    </div>

    {/* Caption */}
    <div
      className="
        p-3 text-sm
        text-gray-700 dark:text-gray-300
        transition-colors
      "
    >
      {post.caption}
    </div>
  </article>
));

export default PostCard;
