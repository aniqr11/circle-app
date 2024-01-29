import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../types/user";
import { SetAuthToken } from "../../libs/api";
import { jwtDecode } from "jwt-decode";

const initialState: UserAPI = {
  id: 0,
  email: "",
  username: "",
  fullname: "",
  profile_picture: "",
  profile_description: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const payload = action.payload;
      const token = payload.token;
      const decoded = jwtDecode<{ User: UserAPI }>(token);
      SetAuthToken(token);
      localStorage.setItem("token", token);
      // API.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const user: UserAPI = {
        id: decoded.User.id,
        email: decoded.User.email,
        fullname: decoded.User.fullname,
        profile_picture: decoded.User.profile_picture,
        username: decoded.User.username,
        profile_description: decoded.User.profile_description,
      };

      state.email = user.email;
      state.fullname = user.fullname;
      state.id = user.id;
      state.username = user.username;
      state.profile_picture = user.profile_picture;
      state.profile_description = user.profile_description;

      return state;
    },
    AUTH_CHECK: (state, action) => {
      const payload = action.payload;

      const user: UserAPI = {
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
        email: payload.email,
        profile_picture: payload.profile_picture,
        profile_description: payload.profile.description,
      };

      state.email = user.email;
      state.fullname = user.fullname;
      state.id = user.id;
      state.username = user.username;
      state.profile_picture = user.profile_picture;
      state.profile_description = user.profile_description;

      return state;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});

export const { AUTH_CHECK, AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } =
  authSlice.actions;

export const authReducer = combineReducers({
  auth: authSlice.reducer,
});
