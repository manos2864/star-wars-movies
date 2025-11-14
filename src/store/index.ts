import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import homeReducer from "./home/slice";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
