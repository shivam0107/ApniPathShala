import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authenticationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
