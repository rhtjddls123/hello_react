import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IncreasePayload {
  amount: number;
}

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    increase(state, action: PayloadAction<IncreasePayload>) {
      state.counter = state.counter + action.payload.amount;
    },
    decrement(state) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

export const counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
