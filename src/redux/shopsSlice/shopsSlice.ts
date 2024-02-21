import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Shop {
  id: number;
  distance: number;
  name: string;
  description: string;
  banner: string;
  location: string;
  lat: string;
  lng: string;
  zip: string;
  cuisine: string;
  phone_number: string;
  glutenfacility: string;
  opening_hours: string;
  website?: any;
  most_celiac?: any;
  rating: number;
}

export interface Meta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  count: number;
}

export interface Data {
  restaurant: Shop[];
  meta: Meta;
}

export interface ShopsData {
  success: boolean;
  data: Data;
}

export const fetchShops = createAsyncThunk(
  "shops",
  async (obj: { latitude: number; longitude: number; type: number; category: string | undefined }) => {
    const { latitude, longitude, type, category } = obj;
    const url = category === undefined ?`${
      import.meta.env.VITE_BASE_URL
    }/api/get-shop?type=${type}&lat=${latitude}&lng=${longitude}` : `${ import.meta.env.VITE_BASE_URL
    }/api/get-shop?type=${type}&lat=${latitude}&lng=${longitude}&category=${category}`
    const { data } = await axios.get<ShopsData>(url);
    console.log(data + " shopsss");
    return data;
  }
);

export type ShopsStateType = {
  loading: boolean;
  data: ShopsData;
  error: string;
};

const initialState: ShopsStateType = {
  loading: false,
  data: {
    success: false,
    data: {
      meta: { count: 0, currentPage: 0, pageCount: 0, pageSize: 0 },
      restaurant: [],
    },
  },
  error: "",
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShops.pending, (state) => {
      (state.loading = true),
        (state.data = {
          success: false,
          data: {
            meta: { count: 0, currentPage: 0, pageCount: 0, pageSize: 0 },
            restaurant: [],
          },
        }),
        (state.error = "");
    });
    builder.addCase(
      fetchShops.fulfilled,
      (state, action: PayloadAction<ShopsData>) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchShops.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {
          success: false,
          data: {
            meta: { count: 0, currentPage: 0, pageCount: 0, pageSize: 0 },
            restaurant: [],
          },
        }),
        (state.error = action.error.message ? action.error.message : "error");
    });
  },
});

export default shopsSlice.reducer;
