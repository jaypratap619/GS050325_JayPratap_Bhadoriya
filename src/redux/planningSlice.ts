import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningData {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
  salesDollars?: number;
  costDollars?: number;
  gmDollars?: number;
  gmPercentage?: number;
}

interface PlanningState {
  planningData: PlanningData[];
}

const initialState: PlanningState = {
  planningData: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    addPlanningData: (state, action: PayloadAction<PlanningData>) => {
      state.planningData.push(action.payload);
    },
    updatePlanningData: (state, action: PayloadAction<PlanningData>) => {
      const index = state.planningData.findIndex(
        (data) =>
          data.store === action.payload.store &&
          data.sku === action.payload.sku &&
          data.week === action.payload.week
      );
      if (index !== -1) {
        state.planningData[index] = action.payload;
      }
    },
    calculatePlanningData: (state) => {
      state.planningData = state.planningData.map((data) => {
        const salesDollars = data.salesUnits * (data.salesDollars || 0);
        const costDollars = data.salesUnits * (data.costDollars || 0);
        const gmDollars = salesDollars - costDollars;
        const gmPercentage = (gmDollars / salesDollars) * 100;

        return {
          ...data,
          salesDollars,
          costDollars,
          gmDollars,
          gmPercentage,
        };
      });
    },
  },
});

export const { addPlanningData, updatePlanningData, calculatePlanningData } =
  planningSlice.actions;
export default planningSlice.reducer;
