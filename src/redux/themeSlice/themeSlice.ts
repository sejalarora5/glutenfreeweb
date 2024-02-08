import { createSlice } from "@reduxjs/toolkit";

export type ThemeStateType = {
  theme: "light" | "dark";
};

const initialState: ThemeStateType = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export default themeSlice.reducer;

export const { switchTheme } = themeSlice.actions;
