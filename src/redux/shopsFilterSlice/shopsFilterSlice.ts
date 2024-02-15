import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Cuisine {
  id: number;
  name: string;
}

export interface Data {
  gluten: string;
  cuisine: Cuisine[];
}

export interface ShopsFilterData {
  success: boolean;
  data: Data[];
}

export const fetchShopsFilter = createAsyncThunk(
  "shopsFilter",
  async (type: number) => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/api/get-filterlist?type=${type}`;
    const { data } = await axios.get<ShopsFilterData>(url);
    console.log(data + " shops filter");
    return data;
  }
);

export type ShopsFilterStateType = {
  loading: boolean;
  data: ShopsFilterData;
  error: string;
};

const initialState: ShopsFilterStateType = {
  loading: false,
  data: {
    data: [],
    success: false,
  },
  error: "",
};

const shopsFilterSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShopsFilter.pending, (state) => {
      (state.loading = true),
        (state.error = ""),
        (state.data = {
          data: [],
          success: false,
        });
    });
    builder.addCase(
      fetchShopsFilter.fulfilled,
      (state, action: PayloadAction<ShopsFilterData>) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchShopsFilter.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {
          data: [],
          success: false,
        }),
        (state.error = action.error.message ? action.error.message : "error");
    });
  },
});

export default shopsFilterSlice.reducer;
