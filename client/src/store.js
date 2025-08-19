import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"
import projectReducer from "./reducers/projectReducer"
import riskReducer from "./reducers/riskReducer"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    risks: riskReducer

  },
});

export default store