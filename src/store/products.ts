import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type IProduct } from '../types'

export interface ProductsState {
  data: IProduct[]
}

const initialState: ProductsState = {
  data: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {   
        state.data.push(action.payload);
    },
    load: (state, action: PayloadAction<IProduct[]>) => {
      console.log('payload: ', state, action.payload);
      state.data.push(...action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, load } = productsSlice.actions

export default productsSlice.reducer