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
    updateSalesUnits: (state, action: PayloadAction<IPlan>) => {
      const { store, sku, week, salesUnit } = action.payload;
      const index = state.rowData.findIndex(
        (plan) => plan.store === store && plan.sku === sku && plan.week === week
      );

      if (index !== -1) {
        state.rowData[index].salesUnit = salesUnit;
      } else {
        state.rowData.push(action.payload); // Add new entry if not found
      }
    },
    reOrderPlans: (state, action: PayloadAction<IPlan[]>) => {
      state.rowData = action.payload; // Assuming new order of plans is passed
    },
  },
});

export const { updateSalesUnits, reOrderPlans } = planningSlice.actions;
export default planningSlice.reducer;
