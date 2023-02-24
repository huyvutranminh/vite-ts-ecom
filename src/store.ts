import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './pages/ReduxCart/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store