import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("") ? JSON.parse(localStorage.getItem("")) : null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducer: {
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;
