// src/redux/calculationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICalculation {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
  salesDollars: number;
  costDollars: number;
  gmDollars: number;
  gmPercent: number;
}

interface CalculationsState {
  calculations: ICalculation[]; // Array to store the Calculations sheet data
}

const initialState: CalculationsState = {
  calculations: [], // Initialize as an empty array
};

const calculationsSlice = createSlice({
  name: "calculations",
  initialState,
  reducers: {
    reorderCalculations: (state, action: PayloadAction<ICalculation[]>) => {
      state.calculations = action.payload;
    },
  },
});

export const { reorderCalculations } =
  calculationsSlice.actions;
export default calculationsSlice.reducer;
