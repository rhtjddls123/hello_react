import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../components/UI/Notification";

type UiStateType = { cartIsVisible: boolean; notification: NotificationType | null };

const initialUiState: UiStateType = { cartIsVisible: false, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action: PayloadAction<NotificationType>) {
      const notification = action.payload;
      state.notification = {
        ...notification
      };
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;
