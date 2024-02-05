import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TipsReducer from "./features/tipSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tip: TipsReducer,
  },
});
