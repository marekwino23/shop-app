import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct, type CartItem } from '../types'
import { load } from './products'


export interface CartState {
  items: CartItem[],
  // totalPrice: number
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({ /// dispatch => action = { type 'carts/add', payload: { id: '12', name: 'Milk', avaialbleCounts: 2, price: 10 }}
  name: 'carts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ product: IProduct, quantity: number }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const productIndex = state.items.findIndex(item => item.id === action.payload.product.id);
      if (productIndex > -1) {
        state.items[productIndex].quantity += 1;
      } else {
        state.items.push({...action.payload.product, quantity: action.payload.quantity });
      }
      // state.totalPrice += action.payload.product.price * action.payload.quantity
    },
    remove: (state, action: PayloadAction<number>) => { // PayloadAction<> to zwraca ci samo payload
      state.items = state.items.filter((item) => item.id !== action.payload) // to jest tak jakbys uzyl dispatch({ type: '', payload: 1 }) takie cos leci dla tej akcji.
    },
    changeQuantity: (state, action: PayloadAction<{ id: number, value: number }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      // if (index === -1)
      if (index > -1) {
          // if (state.items[index].availableCount > state.items[index].quantity) {
              state.items[index].quantity = action.payload.value;
          // }
      }
    },
    increment: (state, action: PayloadAction<number>) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        // if (index === -1)
        if (index > -1) {
            // if (state.items[index].availableCount > state.items[index].quantity) {
                state.items[index].quantity += 1
            // }
            if (state.items[index].quantity === 0) {
              state.items.filter((product) => product.id === action.payload);
            }
        }
      },
    decrement: (state, action: PayloadAction<number>) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index > -1) {
            if(state.items[index].quantity > 0) {
                state.items[index].quantity -= 1
            }
            if (state.items[index].quantity === 0) {
                state.items = state.items.filter((product) => product.id !== action.payload);
            }
        }
      },
    clearAll: (state) => {
        state.items = []
        // state.totalPrice = 0
      },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, clearAll, increment, decrement, changeQuantity } = cartSlice.actions


// np. remove action to nic innego jak
/*
function remove(id: number) {
  dispatch({ type: 'cart/remove', payload: id });
}
**/
export default cartSlice.reducer