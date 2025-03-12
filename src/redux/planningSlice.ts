import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan } from "./types";

interface IPlanningState {
  rowData: IPlan[];
}

const initialState: IPlanningState = {
  rowData: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<IPlan[]>) => {
      state.rowData = action.payload;
    },
    reOrderPlans: (state, action: PayloadAction<IPlan[]>) => {
      state.rowData = action.payload; // Assuming new order of plans is passed
    },
  },
});

export const { updateSalesUnits, reOrderPlans } = planningSlice.actions;
export default planningSlice.reducer;
