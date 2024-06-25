import { configureStore } from '@reduxjs/toolkit'
import RegionSlice from "./slices/RegionSlice";
import CartSlice from './slices/CartSlice'
import priceReducer from './slices/PricesSlice'

export const store = configureStore({
    reducer: {
        region : RegionSlice,
        cart: CartSlice,
        prices: priceReducer,
    },
})