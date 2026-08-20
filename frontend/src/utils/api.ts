const API_DELAY_MS = 500;
const LAST_PAGE = 8;

export interface Post {
  _id: string;
  caption: string;
  imageUrl: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface PostsPage {
  posts: Post[];
  nextPage: number | null;
}

const wait = (duration: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, duration));

export const fetchPostsAPI = async (
  page = 0,
  limit = 5,
): Promise<PostsPage> => {
  if (!Number.isInteger(page) || page < 0) {
    throw new Error("Page must be a non-negative integer");
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Limit must be a positive integer");
  }

  await wait(API_DELAY_MS);

  const startIndex = page * limit;
  const posts = Array.from({ length: limit }, (_, index): Post => {
    const postIndex = startIndex + index;

    return {
      _id: `${page}-${index}`,
      caption: `Post #${postIndex} — #BharatGram 🇮🇳`,
      imageUrl: `https://picsum.photos/seed/${postIndex}/800/800`,
      user: {
        name: `User ${index}`,
        avatar: `https://i.pravatar.cc/150?u=${page}-${index}`,
      },
    };
  });

  return { posts, nextPage: page < LAST_PAGE ? page + 1 : null };
};
