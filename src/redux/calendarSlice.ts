import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICalendar } from "./types";

interface CalendarState {
  calendar: ICalendar[];
}

const initialState: CalendarState = {
  calendar: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    reorderCalendar: (state, action: PayloadAction<ICalendar[]>) => {
      state.calendar = action.payload;
    },
  },
});

export const { reorderCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
