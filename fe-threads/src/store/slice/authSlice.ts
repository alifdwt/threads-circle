import { setAuthToken } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserListAPI = {
  id: 0,
  full_name: "",
  email: "",
  username: "",
  profile_picture: "",
  profile_description: "",
  created_at: "",
  updated_at: "",
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      console.log(payload);
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("selectedProfile", JSON.stringify(payload.user.id));

      const user: UserListAPI = {
        id: payload.user.id,
        full_name: payload.user.full_name,
        email: payload.user.email,
        username: payload.user.username,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
        // created_at: payload.user.created_at,
        // updated_at: payload.user.updated_at,
        password: payload.user.password,
      };

      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user: UserListAPI = {
        id: payload.user.id,
        full_name: payload.user.full_name,
        email: payload.user.email,
        username: payload.user.username,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
        // created_at: payload.user.created_at,
        // updated_at: payload.user.updated_at,
        password: payload.user.password,
      };

      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
