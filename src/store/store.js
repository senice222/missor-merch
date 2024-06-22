import { configureStore } from '@reduxjs/toolkit'
import RegionSlice from "./slices/RegionSlice";
import CartSlice from './slices/CartSlice'
export const store = configureStore({
    reducer: {
        region : RegionSlice,
        cart: CartSlice
    },
})