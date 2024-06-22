import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            let foundItem = state.items.find((item) => item.name === action.payload.name)
            if (foundItem) {
                foundItem.quantity++
            } else {
                state.items.push(action.payload)
            }

        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((item) => item.name !== action.payload)
        },
        changeQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter((item2) => item2.name !== item.name)
                }
            }
        }
    },
})

export const { addItem, deleteItem, changeQuantity } = CartSlice.actions

export default CartSlice.reducer