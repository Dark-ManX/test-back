import { configureStore } from "@reduxjs/toolkit";
import { memesApi } from "./services/memesApi";
// ...

export const makeStore = () => {
  return configureStore({
    reducer: {
      [memesApi.reducerPath]: memesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(memesApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
