import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter";
import { authReducer } from "./auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
