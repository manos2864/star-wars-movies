import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import moviesReducer from "./movies/slice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
