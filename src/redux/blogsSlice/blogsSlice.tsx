import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Row {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  count: number;
}

export interface Data {
  rows: Row[];
  meta: Meta;
}

export interface BlogsObject {
  success: boolean;
  data: Data;
}

export const fetchBlogs = createAsyncThunk("blogs", async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/get-blogs`;
  const { data } = await axios.get<BlogsObject>(url);
  console.log(JSON.stringify(data) + ' blogssss')
  return data;
});

export type BlogsInitialStateType = {
  loading: boolean;
  data: BlogsObject;
  error: string;
};

const initialState: BlogsInitialStateType = {
  loading: false,
  data: {
    success: false,
    data: {
      rows: [],
      meta: { currentPage: 0, count: 0, pageCount: 0, pageSize: 0 },
    },
  },
  error: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      (state.loading = false),
        (state.error = action.error.message ? action.error.message : "");
    });
  },
});

export default blogsSlice.reducer

