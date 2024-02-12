import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Data {
  language: string;
  languagename: string;
}

export interface LanguageObject {
  success: boolean;
  data: Data[];
  baseurl: string;
}

export const fetchLanguages = createAsyncThunk("languages", async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/get-languages`;
  const { data } = await axios.get<LanguageObject>(url);
  console.log(JSON.stringify(data) + " langss");
  return data;
});

export type LanguageInitialStateType = {
  loading: boolean;
  data: LanguageObject;
  error: string;
};

const initialState: LanguageInitialStateType = {
  loading: false,
  data: { success: false, data: [], baseurl: "" },
  error: "",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLanguages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchLanguages.rejected, (state, action) => {
      (state.loading = false),
        (state.error = action.error.message ? action.error.message : "");
    });
  },
});

export default languageSlice.reducer;
