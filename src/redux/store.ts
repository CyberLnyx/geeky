import { configureStore } from "@reduxjs/toolkit";
import dataCollectionSlice from "./data-collection/dataCollectionSlice";

const store = configureStore({
  reducer: {
    DataCollection: dataCollectionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
