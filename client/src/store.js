import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"
import projectReducer from "./reducers/projectReducer"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer
  },
});

export default store