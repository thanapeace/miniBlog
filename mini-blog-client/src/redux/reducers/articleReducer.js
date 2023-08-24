import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async ({ updatedArticleData, navigate, toast }, { rejectWithValue }) => {
    try {
      const payload = {
        title: updatedArticleData.title,
        content: updatedArticleData.content,
        categoryId: updatedArticleData.categoryId,
        published: updatedArticleData.published,
      };
      const response = await api.createArticle(payload);
      toast.success("Article added Successfully");
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.getArticles(query);
      return {
        response,
        query: query,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticle = createAsyncThunk(
  "article/getArticle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getArticle(id);
      // console.log(response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserArticles = createAsyncThunk(
  "article/getUserArticles",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserArticles(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteArticle(id);
      toast.success("Article Deleted Successfully");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ id, updatedArticleData, toast, navigate }, { rejectWithValue }) => {
    try {
      const payload = {
        title: updatedArticleData.title,
        content: updatedArticleData.content,
        categoryId: updatedArticleData.categoryId,
        published: updatedArticleData.published,
      };

      const response = await api.updateArticle(payload, id);
      toast.success("Article Updated Successfully");
      navigate(`/articles/${response.data.id}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

function arrayWithNoDuplicates(array, field) {
  const arrayWithoutNoDuplicates = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t[field] === value[field])
  );
  return arrayWithoutNoDuplicates;
}

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: {},
    articles: [],
    userArticles: [],
    currentPage: 1,
    numberOfPages: 9999,
    error: "",
    loading: false,
    categoryId: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createArticle.pending]: (state) => {
      state.loading = true;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.published == false) {
        state.userArticles = arrayWithNoDuplicates(
          [...[action.payload], ...state.userArticles],
          "id"
        );
      } else {
        state.articles = arrayWithNoDuplicates(
          [...[action.payload], ...state.articles],
          "id"
        );
      }
    },
    [createArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getArticles.pending]: (state) => {
      state.loading = true;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = arrayWithNoDuplicates(
        [...action.payload.response.data.result, ...state.articles],
        "id"
      );
      state.numberOfPages = action.payload.response.data.numberOfPages;
      state.currentPage = action.payload.response.data.currentPage;
    },
    [getArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getArticle.pending]: (state) => {
      state.loading = true;
    },
    [getArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload;
    },
    [getArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserArticles.pending]: (state) => {
      state.loading = true;
    },
    [getUserArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.userArticles = action.payload;
    },
    [getUserArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteArticle.pending]: (state) => {
      state.loading = true;
    },
    [deleteArticle.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;

      if (id) {
        state.userArticles = state.userArticles.filter(
          (item) => item.id !== id
        );
        state.articles = state.articles.filter((item) => item.id !== id);
      }
    },
    [deleteArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateArticle.pending]: (state) => {
      state.loading = true;
    },
    [updateArticle.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;
      console.log({ t: "from update", meta: action.meta, pay: action.payload });
      if (id) {
        console.log;
        state.userArticles = state.userArticles.map((item) =>
          item.id === id ? action.payload.data : item
        );
        state.articles = state.articles.map((item) =>
          item.id === id ? action.payload.data : item
        );
      }
    },
    [updateArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
