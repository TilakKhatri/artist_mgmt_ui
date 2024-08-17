import {
  getUserData,
  isUserLogin,
  setUserLogin,
  resetUserLogin,
  getToken,
} from "@/utils/user.utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: getUserData() || {},
  loginStatus: isUserLogin() || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      setUserLogin({ ...action.payload });
      console.log("setLogin, reducer", action.payload);
      state.user = action.payload;
      state.loginStatus = true;
    },

    setUser: (state, action) => {
      setUser({ ...state.user, ...action.payload });
      state.user = { ...state.user, ...action.payload };
    },

    resetLogin: (state) => {
      console.log("state", state);
      resetUserLogin();
      state.user = null;
      state.loginStatus = false;
    },
  },
});

export const { setLogin, setUser, resetLogin } = userSlice.actions;
export default userSlice.reducer;
