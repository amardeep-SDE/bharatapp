export const fetchPostsAPI = async (page = 0, limit = 5) => {
  await new Promise((r) => setTimeout(r, 500));

  const posts = Array.from({ length: limit }).map((_, i) => ({
    _id: `${page}-${i}`,
    caption: `Post #${page * 10 + i} — #BharatGram 🇮🇳`,
    imageUrl: `https://picsum.photos/seed/${page * 10 + i}/800/800`,
    user: { name: `User ${i}`, avatar: `https://i.pravatar.cc/150?u=${page}-${i}` },
  }));

  const hasMore = page < 8;
  return { posts, nextPage: hasMore ? page + 1 : null };
};
