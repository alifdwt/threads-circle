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
  initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      console.log(payload);
      // setAuthToken(payload.token)
    },
  },
});
