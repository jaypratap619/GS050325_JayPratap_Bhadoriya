import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iplan } from "./types";

interface PlansState {
  plans: Iplan[];
}

const initialState: PlansState = {
  plans: [],
};

const planningSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    reorderPlans: (state, action: PayloadAction<Iplan[]>) => {
      state.plans = action.payload;
    },
  },
});

export const { reorderPlans } = planningSlice.actions;
export default planningSlice.reducer;
