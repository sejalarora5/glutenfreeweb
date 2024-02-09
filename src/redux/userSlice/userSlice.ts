import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../pages/login_page/LoginPage";

export type UserStateType = {
  token: string;
  userData: UserData;
};

const initialState: UserStateType = {
  token: "",
  userData: {
    id: -1,
    name: "",
    email: "",
    password: "",
    date: "",
    role: "",
    phone: "",
    glutenintolerant: "",
    city: "",
    status: "",
    token: "",
    country_code: null,
    device_token: null,
    device_type: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserStateType>) => {
      (state.token = action.payload.token),
        (state.userData = action.payload.userData);
    },
    logOutUser: () => initialState,
  },
});

export default userSlice.reducer;
export const { saveUser, logOutUser } = userSlice.actions;
