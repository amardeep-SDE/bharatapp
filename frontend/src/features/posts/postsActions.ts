import { AppDispatch, RootState } from "../../store";
import { fetchPostsAPI } from "../../utils/api";
import { setLoading, setError, appendPosts } from "./postsSlice";

export const fetchPosts = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { nextPage, loading } = getState().posts;
    if (loading || nextPage === null) return;

    try {
      dispatch(setLoading(true));
      const data = await fetchPostsAPI(nextPage);
      dispatch(appendPosts(data));
    } catch (error: any) {
      dispatch(setError(error.message || "Failed to load posts"));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
