import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "./types";

interface StoresState {
  stores: IStore[];
}

const initialState: StoresState = {
  stores: [],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<IStore>) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },
    updateStore: (state, action: PayloadAction<IStore>) => {
      const index = state.stores.findIndex(
        (store) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    reorderStores: (state, action: PayloadAction<IStore[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { addStore, removeStore, updateStore, reorderStores } =
  storesSlice.actions;
export default storesSlice.reducer;