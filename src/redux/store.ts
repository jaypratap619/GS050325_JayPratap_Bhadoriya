// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storesSlice";
import skusReducer from "./skusSlice";
import calendarReducer from "./calendarSlice";
import planningReducer from "./planningSlice";
import calculationsReducer from "./calculationsSlice"; // Import the new slice

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
    calendar: calendarReducer,
    calculations: calculationsReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
