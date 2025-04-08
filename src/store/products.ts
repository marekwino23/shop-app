import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type IProduct } from '../types'
import mockData from '../mockData'

export interface ProductsState {
  data: IProduct[]
}

const initialState: ProductsState = {
  data: mockData as unknown as IProduct[]
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {   
        state.data.push(action.payload);
    },
    load: (state, action: PayloadAction<IProduct[]>) => {
      // state.data = [...state.data, ...action.payload];
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, load} = productsSlice.actions

export default productsSlice.reducer