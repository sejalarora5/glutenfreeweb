import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Shops_rating {
  id: number;
  userid: string;
  title: string;
  name: string;
  date: string;
  comment: string;
  star: string;
  restaurantid: number;
  image: string;
}

export interface Data {
  name: string;
  description: string;
  banner: string;
  location: string;
  lat: string;
  lng: string;
  zip: string;
  cuisine: string;
  phone_number: string;
  glutenfacility: boolean;
  status: string;
  type: string;
  opening_hours: string;
  website?: any;
  restaurant_rating: Shops_rating;
  rating_count: number;
  avg_count: number;
  bookmark: boolean;
}

export interface ShopsDetailObject {
  success: boolean;
  data: Data;
}

export const fetchShopsDetail = createAsyncThunk(
  "shopsDetail",
  async (obj: { token: string; userId: string; restaurantId: number }) => {
    const { token, userId, restaurantId } = obj;
    const url =
      token !== ""
        ? `${
            import.meta.env.VITE_BASE_URL
          }/api/single-shop?restaurantid=${restaurantId}&userId=${userId}&bookmark=1`
        : `${
            import.meta.env.VITE_BASE_URL
          }/api/single-shop?restaurantid=${restaurantId}&bookmark=0`;
    const { data } = await axios.get<ShopsDetailObject>(url);
    console.log(data, ' shops detail')
    return data;
  }
);

export type ShopsDetailStateType = {
  loading: boolean;
  data: ShopsDetailObject;
  error: string;
};

const initialState: ShopsDetailStateType = {
  loading: false,
  data: {
    data: {
      name: "",
      description: "",
      banner: "",
      location: "",
      lat: "",
      lng: "",
      zip: "",
      cuisine: "",
      phone_number: "",
      glutenfacility: false,
      status: "",
      type: "",
      opening_hours: "",
      website: "",
      restaurant_rating: {
        id: 0,
        userid: "",
        title: "",
        name: "",
        date: "",
        comment: "",
        star: "",
        restaurantid: 0,
        image: "",
      },
      rating_count: 0,
      avg_count: 0,
      bookmark: false,
    },
    success: false,
  },
  error: "",
};

const shopsDetailSlice = createSlice({
  name: "shopsDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShopsDetail.pending, (state) => {
      (state.loading = true),
        (state.data = {
          data: {
            name: "",
            description: "",
            banner: "",
            location: "",
            lat: "",
            lng: "",
            zip: "",
            cuisine: "",
            phone_number: "",
            glutenfacility: false,
            status: "",
            type: "",
            opening_hours: "",
            website: "",
            restaurant_rating: {
              id: 0,
              userid: "",
              title: "",
              name: "",
              date: "",
              comment: "",
              star: "",
              restaurantid: 0,
              image: "",
            },
            rating_count: 0,
            avg_count: 0,
            bookmark: false,
          },
          success: false,
        }),
        (state.error = "");
    });
    builder.addCase(
      fetchShopsDetail.fulfilled,
      (state, action: PayloadAction<ShopsDetailObject>) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchShopsDetail.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {
          data: {
            name: "",
            description: "",
            banner: "",
            location: "",
            lat: "",
            lng: "",
            zip: "",
            cuisine: "",
            phone_number: "",
            glutenfacility: false,
            status: "",
            type: "",
            opening_hours: "",
            website: "",
            restaurant_rating: {
              id: 0,
              userid: "",
              title: "",
              name: "",
              date: "",
              comment: "",
              star: "",
              restaurantid: 0,
              image: "",
            },
            rating_count: 0,
            avg_count: 0,
            bookmark: false,
          },
          success: false,
        }),
        (state.error = action.error.message ? action.error.message : "error");
    });
  },
});

export default shopsDetailSlice.reducer;
