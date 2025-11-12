import { createSlice } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  caption: string;
  imageUrl: string;
  user: { name: string; avatar: string };
}

interface PostsState {
  items: Post[];
  nextPage: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  nextPage: 0,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    appendPosts: (state, action) => {
      state.items = [...state.items, ...action.payload.posts];
      state.nextPage = action.payload.nextPage;
    },
    resetPosts: (state) => {
      state.items = [];
      state.nextPage = 0;
      state.error = null;
    },
  },
});

export const { setLoading, setError, appendPosts, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
