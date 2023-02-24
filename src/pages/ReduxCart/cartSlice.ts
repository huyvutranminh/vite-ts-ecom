import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'src/types/product.type'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { _id, quantity } = action.payload
      const existingItem = state.items.find((item) => item._id === _id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const { _id, quantity } = action.payload
      const existingItem = state.items.find((item) => item._id === _id)

      if (existingItem) {
        existingItem.quantity -= quantity

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item._id !== _id)
        }
      }
    },
    deleteItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id)
    }
  }
})

export const { addItem, removeItem, deleteItem } = cartSlice.actions

export default cartSlice.reducer
