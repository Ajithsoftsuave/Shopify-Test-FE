import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../interface/cartInterface";

export interface CartState {
  isCartLoading: boolean;
  cartData: Cart | null;
}

const initialState: CartState = {
  isCartLoading: false,
  cartData: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartLoading(state, action) {
      state.isCartLoading = action.payload;
    },
    setCartData(state, action: PayloadAction<Cart | null>) {
      state.cartData = action.payload;
    },
  },
});

export const { setIsCartLoading, setCartData } = cartSlice.actions;

export default cartSlice.reducer;
