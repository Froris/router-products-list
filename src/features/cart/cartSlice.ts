import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type CartItem = {
  // TODO will be updated in the future. Will match fetched order cart type
  // addIngredients: string[];
  // removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type InitialState = { cart: CartItem[] };

const initialState: InitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const order = state.cart.find((item) => item.pizzaId === action.payload);

      if (order) {
        order.quantity++;
        order.totalPrice = order.unitPrice * order.quantity;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const order = state.cart.find((item) => item.pizzaId === action.payload);

      if (order) {
        order.quantity--;
        order.totalPrice = order.unitPrice * order.quantity;
      }

      if (order && order.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCartTotalQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getCart = (state: RootState) => state.cart.cart;
export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
