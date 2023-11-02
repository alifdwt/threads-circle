import UserListAPI from "@/types/UserListAPI";
import { createSlice } from "@reduxjs/toolkit";

interface UserSliceState {
  user?: UserListAPI;
  accessToken?: string;
}

const initialState: UserSliceState = {
  user: {} as UserListAPI,
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = "";
      state.user = {} as UserListAPI;
    },
  },
});

export const { login, logout, getUser } = userSlice.actions;

export default userSlice.reducer;
