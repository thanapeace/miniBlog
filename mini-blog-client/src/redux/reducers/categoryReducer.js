import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";

export const getPopularCategories = createAsyncThunk(
  "category/getPopularCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPopularCategories();
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categoryList: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
     [getPopularCategories.pending]: (state) => {
      state.loading = true;
    },
    [getPopularCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
    },
    [getPopularCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPopularCategories.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default categorySlice.reducer;
