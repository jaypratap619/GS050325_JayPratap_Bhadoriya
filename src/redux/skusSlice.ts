import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISKU } from "./types";

interface SKUsState {
  skus: ISKU[];
}

const initialState: SKUsState = {
  skus: [],
};

const skusSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<ISKU>) => {
      state.skus.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (state, action: PayloadAction<ISKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    reorderSKUs: (state, action: PayloadAction<ISKU[]>) => {
      state.skus = action.payload;
    },
  },
});

export const { addSKU, removeSKU, updateSKU, reorderSKUs } = skusSlice.actions;
export default skusSlice.reducer;
